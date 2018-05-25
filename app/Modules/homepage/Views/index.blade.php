@extends('abstracts::base.1_column')

@section('page_header')
@endsection
@section('page_body')

<div class="homepage-header-container">
    <div class="row" style="padding-top: 2%;">

        <div class="col-xs-12 col-md-8">

        </div>
        <div class="col-xs-12 col-md-4">
            <a class="homepage-post-job" href="">
                post a job
            </a>
            <a class="homepage-tag" href="/user/sign-up">
                join
            </a>
            <a class="homepage-tag" href="/user/login">
                login
            </a>
        </div>

    </div>
    <div class="row">
        <h1 class="text-md-center text-xs-center text-lg-center col-md-12 col-xs-12">
            uptrade
        </h1>
        <h2 class="text-md-center text-xs-center text-lg-center col-md-12 col-xs-12">
            Australia's number #1 search engine<br /> for jobs in the trade
        </h2>

    </div>
</div>

{!! Form::open(array('url' => 'user/login')) !!}
<div class="row homepage-search-container">
    <div class="col-xs-12 col-md-4">
        <fieldset class="form-group text-xs-left has-success-crm">
            <input type="text" name="title" data-validation="required" value="" class="form-control valid" placeholder="Keywords">
        </fieldset>
    </div>
    <div class="col-xs-12 col-md-4">
        <fieldset class="form-group text-xs-left">
            <input type="text" name="location" data-validation="required" value="" class="form-control" placeholder="Location">
        </fieldset>
    </div>
    <div class="col-xs-12 col-md-2">
        <fieldset class="form-group text-xs-left">
            <input type="text" name="trade" data-validation="required" value="" class="form-control" placeholder="Trade">
        </fieldset>
    </div>
    <div class="col-xs-12 col-md-2">
        <fieldset class="form-group text-xs-left">
            <input type="submit" class="btn btn-block btn-primary" value="search">
        </fieldset>
    </div>
</div>
{!! Form::close() !!}

<div class="row homepage-title-container">
    <div class="text-md-center text-xs-center text-lg-center col-xs-12 col-md-4">
        <img class="img-fluid" src="/media/sign-up.png" >
    </div>
    <div class="col-xs-12 col-md-4">

    </div>
    <div class="text-md-center text-xs-center text-lg-center col-xs-12 col-md-12">
        <h2 class="homepage-title">
            Want a job? Search through 23,000 jobs
        </h2>
        <button class="btn btn-primary homepage-button"> OK, take me to the search area </button>
    </div>

    <div class="text-md-center text-xs-center text-lg-center col-xs-12 col-md-12" style="background-color: #E7F3FB;padding: 6% 0 0% 0;">
        <h2 class="homepage-title">
            Want to post an ad to the biggest tradie<br /> community in Australia?
        </h2>
        <button class="btn btn-primary homepage-button"> Post an ad fore free</button>
        <a href="#" class="col-md-12" style="font-size: 20px;position: relative;bottom: 30px;">have your first ad on us - free!</a>
    </div>

    <div class="text-md-left text-xs-center text-lg-left col-xs-12 col-md-12" style="padding-top: 5%;">
        <h3 class="homepage-title">
            Browse Aus jobs
        </h3>
        <div class="col-md-3 homepage-job-browser">
            <h4>Location</h4>
                <a href="/?melbourne">&nbsp;</a>
                <a href="/?melbourne">Jobs in Melbourne</a>
                <a href="/?melbourne">Jobs in Melbourne</a>
                <a href="/?melbourne">Jobs in Melbourne</a>
                <a href="/?melbourne">Jobs in Melbourne</a>
        </div>
        <div class="col-md-3 homepage-job-browser">
            <h4>Location</h4>
            <a href="/?melbourne">&nbsp;</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
        </div>
        <div class="col-md-3 homepage-job-browser">
            <h4>Location</h4>
            <a href="/?melbourne">&nbsp;</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
        </div>
        <div class="col-md-3 homepage-job-browser">
            <h4>Location</h4>
            <a href="/?melbourne">&nbsp;</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
            <a href="/?melbourne">Jobs in Melbourne</a>
        </div>

    </div>

</div>




@endsection