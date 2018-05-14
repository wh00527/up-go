@extends('abstracts::base.1_column')
@section('top_nav')
    @include('abstracts::base.top_nav')
@endsection
@section('page_body')

    <div class="wrapper wrapper-content">
        <div class="row business-container">
            <div class="col-xs-12">
                <div class="tab-content">
                        <div class="row">
                            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 grey-container business-applicants-status">
                                <h5 class="pull-left">7 Open Jobs</h5>
                                <h5 class="pull-left">7 Open Jobs</h5>
                                <h5 class="pull-left">7 Open Jobs</h5>
                                <h5 class="pull-left">7 Open Jobs</h5>
                                <h5 class="pull-left">7 Open Jobs</h5>
                                <h5 class="pull-left">7 Open Jobs</h5>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <fieldset class="m-b-1 text-xs-left has-success-crm">
                                    <input type="text" name="job-title" value="" class="form-control valid" placeholder="Search by job title">
                                </fieldset>
                                <fieldset class="form-group text-xs-left has-success-crm">
                                    <input type="text" name="MinGuest" data-validation="required" value="" class="form-control valid" placeholder="Search by trade">
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <input type="checkbox" name="bulk-action" />
                            <button>Send Email</button>
                            <button>Change Status</button>
                        </div>
                        <div class="row grey-container">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <h5 class="pull-left">Name</h5>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <h5 class="pull-left">Applicants</h5>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <h5 class="pull-left">Days Remaining</h5>
                            </div>
                        </div>
                        <?php $i = array(1);?>
                        <?php foreach($i as $k): ?>
                            <div class="row business-box">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <h5>Job</h5>
                                    <p>Career type</p>
                                    <p>Location</p>
                                    <p>Full Time/ Part Time</p>
                                    <p>Updated Time</p>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <p>Job Title</p>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <h5 class="pull-left">Days Remaining</h5>
                                </div>
                            </div>
                        <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
@endsection
