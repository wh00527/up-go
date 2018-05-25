@extends('abstracts::base.1_column')
@section('page_body')
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <h3>Join the community</h3>
            <h3>Upgrade with uptrade today</h3>
            <!--        <form class="m-t" role="form" action="/user/login" method="post">-->
            <!--            <div class="form-group">-->
            <!--                <input type="email" class="form-control" name="email" placeholder="Email" required="">-->
        <!--                <p class="errors">{{$errors->first('email')}}</p>-->
            <!--            </div>-->
            <!--            <div class="form-group">-->
            <!--                <input type="password" class="form-control" placeholder="Password" required="">-->
        <!--                <p class="errors">{{$errors->first('password')}}</p>-->
            <!--            </div>-->
            <!---->
            <!--        </form>-->
            {!! Form::open(array('url' => 'user/login')) !!}
            @if(Session::has('error'))
                <div class="alert-box success">
                    <h2>{{ Session::get('error') }}</h2>
                </div>
            @endif
            <div class="controls">
                {!! Form::text('email','',array('id'=>'','class'=>'form-control span6','placeholder' => 'Please Enter your Email')) !!}
                <p class="errors">{{$errors->first('email')}}</p>
            </div>
            <div class="controls">
                {!! Form::password('password',array('class'=>'form-control span6', 'placeholder' => 'Please Enter your Password')) !!}
                <p class="errors">{{$errors->first('password')}}</p>
            </div>
            <div class="controls">
                <button type="submit" class="btn btn-primary block full-width m-b">Sign up</button>
            </div>

            <div class="controls">
                <p>
                    By signing up, you agreed to the <a href="/111">Terms of Service</a> and <a href="/111">Privacy Policy</a>,
                    including <a href="/111">Cookie Use</a>. Others will be able to find your by email or phone number when provided.
                </p>
            </div>

            {!! Form::close() !!}
        </div>
    </div>
@endsection
