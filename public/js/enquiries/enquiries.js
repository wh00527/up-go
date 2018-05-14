'use strict';

/* Dropzone + cropper */
Dropzone.autoDiscover = false;

$(document).ready(function () {
    //DATATABLE
    //To display datatable without search and page length select, and to still have pagination work, instantiate like so

    //DATE RANGE
    //set global vars that are set by daterange picker, to be used by datatable
    var startdate;
    var enddate;

    startdate = new Date();
    var dd = startdate.getDate();
    var mm = moment(startdate).format("MMM"); //January is 0!
    var yyyy = startdate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    startdate = dd + ' ' + mm + ', ' + (yyyy - 1);
    enddate = dd + ' ' + mm + ', ' + yyyy;

    var oTable = $('#dataTables-enquiries').dataTable({
        "buttons": [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ],
        "dom": '<"text-xs-left"i>r<"text-xs-right"tl><"row"><"text-xs-right"p><"clear">',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "pageLength": 10,
        "pagination": true,
        "columnDefs": [
            {targets: 'no-sort', orderable: false}
        ],
        "order": [[0, "desc"]]
    });

    //instantiate datepicker and choose your format of the dates
    $('#reportrange').daterangepicker({
            opens: 'left',
            locale: {
                format: 'DD MMM, YYYY'
            },
            "ranges": {
                "Last 12 Months": [
                    "14 Jun, 2015",
                    "14 Jun, 2016"
                ],
                "This Month": [
                    "1 Jun, 2016",
                    "30 Jun, 2016"
                ],
                "Last 30 Days": [
                    "14 May, 2016",
                    "14 Jun, 2016"
                ],
                "Last 7 Days": [
                    "06 Jun, 2016",
                    "14 Jun, 2016"
                ]
            },
            "startDate": startdate,
            "endDate": enddate
        },
        function (start, end, label) {
            // Parse it to a moment
            var s = moment(start.toISOString());
            var e = moment(end.toISOString());
            startdate = s.format("YYYY-MM-DD");
            enddate = e.format("YYYY-MM-DD");
        });

    //Filter the datatable on the datepicker apply event
    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        startdate = picker.startDate.format('YYYY-MM-DD');
        enddate = picker.endDate.format('YYYY-MM-DD');
        oTable.fnDraw();
    });
        // console.log(startdate);
    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            // console.log('afnFiltering called');
            if (startdate != undefined) {
                // 0 here is the column where my dates are.
                //Convert to YYYY-MM-DD format from DD/MM/YYYY
               //Check if the first column is date of expected format before continuing
                if (!moment( aData[0], "DD/MM/YYYY", true).isValid() ) { return true; }
                var coldate = aData[0].split("/");
                var d = new Date(coldate[2], coldate[1] - 1, coldate[0]);

                var date = moment(d.toISOString());

                date = date.format("YYYY-MM-DD");

                //Remove hyphens from dates
                var dateMin = startdate.replace(/-/g, "");
                var dateMax = enddate.replace(/-/g, "");
                date = date.replace(/-/g, "");

                //console.log(dateMin, dateMax, date);

                // run through cases to filter results
                if (dateMin == "" && date <= dateMax) {
                    return true;
                }
                else if (dateMin == "" && date <= dateMax) {
                    return true;
                }
                else if (dateMin <= date && "" == dateMax) {
                    return true;
                }
                else if (dateMin <= date && date <= dateMax) {
                    return true;
                }

                // all failed
                return false;
            }
        }
    );

    $("#searchbox").keyup(function () {
        console.log("Search Term: " + this.value);
        oTable.fnFilter(this.value);
    });
    //Tinymce editor
    tinymce.init({
        selector: '#edit-template-message',
        setup: function (editor) {
            editor.on('change', function () {
                editor.save();
            });
        },
        menubar: false,
        statusbar: false,
        removed_menuitems: 'formats',
        resize: 'true',
        toolbar: 'undo redo | styleselect | fontselect fontsizeselect | bullist numlist outdent indent | removeformat | cut copy paste |'
    });

    tinymce.init({
        selector: '#edit-template-signature',
        setup: function (editor) {
            editor.on('change', function () {
                editor.save();
            });
        },
        menubar: false,
        statusbar: false,
        removed_menuitems: 'formats',
        resize: 'true',
        toolbar: 'undo redo | styleselect | fontselect fontsizeselect | bullist numlist outdent indent | removeformat | cut copy paste |'
    });

    $(".dropdown-menu a").click(function () {
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <i class="fa fa-chevron-down pull-right" aria-hidden="true"></i>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));

        // TODO: push changes back via AJAX.
    });

    // Delete enquiry
    $('.delete-enquiry').click(function () {
        var id = $(this).data('enquiry-id');
        HttpRequest("/enquiries/delete/" + id, '', 'DELETE');
    });

    // Spam enquiry
    $('.spam-enquiry').click(function () {
        var id = $(this).data('enquiry-id');
        console.log("spam-enquiry | id: " + id);
        HttpRequest("/enquiries/spam/" + id, array, 'POST');
    });

    // View enquiry
    $('.view-enquiry').click(function () {
        var id = $(this).data('enquiry-id');
        window.location.href = "/enquiries/enquiry-details/" + id;
    });

    // Add note
    $('#add-note').click(function () {
        var id = $('#enquiry-id').val();
        var note = $('#note-content').val();
        HttpRequest("/enquiries/notes/create", array, 'POST');
    });

    // Delete note
    $('.delete-note').click(function () {
        var id = $(this).data('enquiry-id');
        var note = $(this).data('note-id');
        HttpRequest("/enquiries/" + id + "/notes/" + note, '', 'DELETE');
    });

    // Update note
    $('#update-note').click(function () {
        var note = $('#update-note-content').val();
        var update_enquiry_id = $('#update_enquiry_id').val();
        var update_note_id = $('#update_note_id').val();
        var array = {note: note};
        HttpRequest("/enquiries/" + update_enquiry_id + "/notes/" + update_note_id, array, 'PUT');
    });

    // Delete Note:

    function HttpRequest(url, value, type) {
        $.ajax({
            type: type,
            url: url,
            data: value,
            cache: false,
            success: function (data) {
                //
            },
            complete: function () {
                window.location.reload();
            }
        });
    }

    $("div#image-uploader-attachment").dropzone({
        url: '/enquiries/template/attachment'
    });

    $("div#image-uploader-logo").dropzone({
        url: '/enquiries/template/logo'
    });

    // Update note
    $('#update-template').click(function () {
        var subject = $('#subject').val();
        var greeting = $('#greeting').val();
        var message = $('#edit-template-message').val();
        var signature = $('#edit-template-signature').val();
        var array = {subject: subject, greeting: greeting, message: message, signature: signature};
        console.log(array);
        console.log("update-template");
        HttpRequest("/enquiries/edit-template/", array, 'POST');
    });

});

$(document).on("click", ".update-note-modal", function () {
    var enquiry_id = $(this).data('enquiry-id');
    var note_id = $(this).data('note-id');
    var enquiry_note = $('#note-content-' + enquiry_id).text();

    $(".modal-body #update_note_content").val(enquiry_note);
    $(".modal-body #update_enquiry_id").val(enquiry_id);
    $(".modal-body #update_note_id").val(note_id);

    var array = {
        "1": enquiry_id,
        "2": note_id,
        "3": enquiry_note
    };

    console.log(array);

});








