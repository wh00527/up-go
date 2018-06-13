@extends('abstracts::base.1_column')
@section('top_nav')
    @include('abstracts::base.top_nav')
@endsection
@section('page_body')

    <div class="wrapper wrapper-content">
        <div class="row m-b-3">
            <div class="col-lg-8 col-md-8 col-xs-12 float-e-margins">
                <div class="ibox-title">
                    <h5>Welcome {{$user->name}}</h5>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-xs-12 float-e-margins hidden-sm-down">
                    <div class="ibox-title">
                        <span class="pull-left light-blue">Customer service:</span>&nbsp;
                        (03) 9819 2467
                    </div>
            </div>
        </div>


        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 no-padding m-r-3 hidden-sm-down">
                <div class="ibox float-e-margins bg-grey status-all no-padding">
                    <ul>
                        <li class="pull-left"><span class="">{{$rcount}}</span>
                            <br /><br />
                            <label> Job </label>
                            Views
                        </li>
                        <li class="pull-left"><span class="">{{$vcount}}</span>
                            <br /><br />
                            <label> Live </label>
                            Jobs
                        </li>
                        <li class="pull-left"><span class="">180</span>
                            <br /><br />
                            <label> Jobs </label>
                            expiring soon
                        </li>
                        <li class="pull-left"><span class="">{{$icount}}</span>
                            <br /><br />
                            <label> Expired </label>
                            Jobs
                        </li>
                        <li class="pull-left"><span class="">{{$acount}}</span>
                            <br /><br />
                            <label> Applicants </label>
                        </li>
                    </ul>

                </div>
            </div>
            <div class="col-lg-3 col-md-3 col-md-sm-3 col-xs-12">
                <div class="float-e-margins">
                    <div class="ibox-title">
                        <h5>Your Account</h5>
                        <p># <?php echo Session::get('currentUserId') ?></p>
                    </div>
                </div>
            </div>


        </div>
        <h3 class="row m-t-1 m-b-1"> Recent Job Activity </h3>
        <div class="row">
        @foreach ($data as $data)
            <!-- <p>This is user {{ $data->id }}</p> -->
            <div class="dash-container col-lg-7 col-md-7 col-xs-12">
                <h5>Qualified Carpenter needed ASAP. Please only apply</h5>
                <span>Melbourne, VIC, 3000</span>
                <span class="blue">2 new connections</span>
                    <span class="pull-left time-remaining">
                        27 days remaining
                    </span>
                    <span class="pull-right">
                        8 new views
                    </span>
            </div>
        @endforeach
        {!! $datas->render()!!}
            <div class="col-lg-1 col-md-1 col-xs-0"></div>
            <div class="dash-container col-lg-4 col-md-4 col-xs-12">
                <span class="m-b-2">Ad packs</span>
                <h4>Post more than 3 jobs in 6 months?</h4>
                <p>Save with an ad pack</p>
                <button class="btn btn-block btn-primary m-b-3">Buy an ad pack now</button>
            </div>
        </div>
    </div>
@endsection
