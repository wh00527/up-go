<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @section('css')
        {!! HTML::style('bower_components\bootstrap\dist\css\bootstrap.css') !!}
        {!! HTML::style('bower_components\font-awesome\css\font-awesome.css') !!}
        {!! HTML::style('bower_components\animate.css\animate.css') !!}
        {!! HTML::style('css\main.css') !!}
    @show
</head>
<body>
<div id="header">
    @section('page_header')
        @include('abstracts::base.page_header')
    @show
</div>
<div id="top-nav">
    @section('top_nav')
    @show
</div>
<div id="wrapper">
    @section('page_body')
    @show
</div>

<div id="footer">
    @section('page_footer')
        @include('abstracts::base.page_footer')
    @show
</div>

@section('script')
    {!! HTML::script('bower_components\jquery\dist\jquery.js') !!}
    {!! HTML::script('bower_components\bootstrap\dist\js\bootstrap.js') !!}

    {!! HTML::script('bower_components\metisMenu\dist\metisMenu.js') !!}
    {!! HTML::script('bower_components\jquery-slimscroll\jquery.slimscroll.js') !!}
    {!! HTML::script('bower_components\PACE\pace.js') !!}

    {!! HTML::script('bower_components\mustache.js\mustache.js') !!}
    {!! HTML::script('bower_components\moment\moment.js') !!}
    {!! HTML::script('bower_components\accounting\accounting.js') !!}
    {!! HTML::script('bower_components\eonasdan-bootstrap-datetimepicker\src\js\bootstrap-datetimepicker.js') !!}
@show
</body>
@yield('style')
</html>