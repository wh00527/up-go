@extends('abstracts::base.1_column')
@section('page_body')

<div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
        <h3>Welcome to Back</h3>
        <h3>Let's get your account fired up</h3>
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
            <input type="checkbox" name="vehicle" value="Bike"> Remember me

            <a href="/user/sendMail" class="component_9w5i1l">Forgot password?</a>
        </div>
        <!-- <div class="controls">
            <input type="radio" name="type" id="" value="1" checked="checked">雇主
            <input type="radio" name="type" id="" value="2">雇员
        </div> -->
        <div class="controls">
            <button type="submit" class="btn btn-primary block full-width m-b">Login</button>

        </div>
        <div class="controls" style="margin-top: 10%;">
            <p>Don't have an account?  <a href="/user/create-user">Sign up</a></p>
        </div>

        {!! Form::close() !!}
    </div>
</div>

@endsection


@section('page_footer')

@endsection
