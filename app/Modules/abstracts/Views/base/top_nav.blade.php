<?php if( Session::get('currentUserRole')  ):?>
    <div class="top-menu hidden-sm-down">
        <?php if(Session::get('currentUserRole') == 2 ):?>
        <a class="" href="/dashboard">
            Home
        </a>
        <a class="" href="/business/jobs">
            Jobs
        </a>
        <a class="" href="/business/applicants">
            Applicants
        </a>
        <a class="" href="/business/products">
            Products
        </a>
        <a class="" href="/user/settings">
            Settings
        </a>
        <?php else: ?>
        <a class="" href="/business/applicants">

        </a>
        <?php endif;?>
    </div>
<?php endif; ?>
