<div class="row wrapper border-bottom page-heading">
    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 header-sign-up">
        <h1>
            Uptrade
        </h1>
    </div>
    <?php if(Session::get('currentUserRole')): ?>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 header-sign-up hidden-sm-down">
                <?php echo Session::get('currentUserDetails')['firstName'] ?>
                    <i class="fa fa-sort-desc" aria-hidden="true"></i>
            </div>
        <?php else: ?>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 header-sign-up hidden-sm-down">
                Don't have an account? <a href="/user/sign-up" class="">Sign up </a>
            </div>
    <?php endif; ?>
</div>