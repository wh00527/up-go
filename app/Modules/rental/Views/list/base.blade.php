<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
    {!! HTML::style('bower_components\bootstrap\dist\css\bootstrap.css') !!}
    {!! HTML::style('bower_components\font-awesome\css\font-awesome.css') !!}
    {!! HTML::style('bower_components\animate.css\animate.css') !!}
    {!! HTML::style('inspinia_admin-v2.3\css\style.css') !!}
    {!! HTML::style('bower_components\eonasdan-bootstrap-datetimepicker\build\css\bootstrap-datetimepicker.css') !!}
</head>
<body>
<div class="container">
    @yield('content')
</div>

<div class="footer">
    @yield('footer')
</div>

{!! HTML::script('bower_components\jquery\dist\jquery.js') !!}
{!! HTML::script('bower_components\bootstrap\dist\js\bootstrap.js') !!}
{!! HTML::script('bower_components\mustache.js\mustache.js') !!}
{!! HTML::script('bower_components\moment\moment.js') !!}
{!! HTML::script('bower_components\accounting\accounting.js') !!}
{!! HTML::script('bower_components\eonasdan-bootstrap-datetimepicker\src\js\bootstrap-datetimepicker.js') !!}
{!! HTML::script('bower_components\metisMenu\dist\metisMenu.js') !!}
{!! HTML::script('bower_components\jquery-slimscroll\jquery.slimscroll.js') !!}
{!! HTML::script('inspinia_admin-v2.3\js\inspinia.js') !!}
{!! HTML::script('bower_components\PACE\pace.js') !!}
</body>
@yield('script')
@yield('style')
<style>
    .sub-list-item {
        margin-left: 3rem
    }
</style>
</html>