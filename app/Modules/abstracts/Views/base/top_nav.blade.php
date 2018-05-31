<?php if( Session::get('currentUserRole')  ):?>
    <div class="top-menu hidden-sm-down">
        <?php if(Session::get('currentUserRole') == 1 ):?>
        <a class="" href="/dashboard">
            Home
        </a>
        <a class="" href="/dashboard/jobs">
            Jobs
        </a>
        <a class="" href="/dashboard/applicants">
            Applicants
        </a>
        <a class="" href="/dashboard/products">
            Products
        </a>
        <a class="" href="/dashboard/settings">
            Settings
        </a>
        <?php else: ?>
        <a class="" href="/dashboard/applicants">

        </a>
        <?php endif;?>
    </div>
<?php endif; ?>
