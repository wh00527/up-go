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
            {!! Form::text('email','',array('id'=>'email','class'=>'form-control span6','placeholder' => 'Please Enter your Email')) !!}
            <p class="errors">{{$errors->first('email')}}</p>
        </div>
        <div class="controls">
            {!! Form::password('password',array('class'=>'form-control span6', 'placeholder' => 'Please Enter your Password')) !!}
            <p class="errors">{{$errors->first('password')}}</p>
        </div>
        <div class="controls">
            <input type="checkbox" name="vehicle" value="Bike"> Remember me

            <a onclick="sendMail()" class="component_9w5i1l">Forgot password?</a>
        </div>
        <div class="controls">
            <button type="submit" class="btn btn-primary block full-width m-b">Login</button>

        </div>
        <div class="controls" style="margin-top: 10%;">
            <p>Don't have an account?  <a href="/user/sign-up">Sign up</a></p>
        </div>

        {!! Form::close() !!}
    </div>
</div>

@endsection


@section('page_footer')

@endsection
<script>
function sendMail(){
    var email = $('#email').val();
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if(email === ""){ //输入不能为空
　　　　alert("Email Can't be empty!");
　　　　return false;
　　}else if(!reg.test(email)){ //正则验证不通过，格式不对
　　　　alert("Please enter the correct Email!");
　　　　return false;
　　}else{
　　　　$.ajax({
            url:"/user/sendMail",
            type:'GET',
            data:{
                email:email,
            },
            dataType:'json',
            success:function(data){
                if(data.status=="ok"){
                    alert(data.msg);
                }else{
                    alert(data.msg);
                }
            },
            error:function(data,status,e){
                alert('error');
            },
            timeout:3000,
            async:true
        });
　　}
}

// /
</script>