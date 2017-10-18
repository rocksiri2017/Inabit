<?php use Cake\Routing\Router; ?>

<body class="inabit_bg" onload="viewTime()">

<div class="row">
    <div class="col-md-12">
        <?= $this->Flash->render() ?>
    </div>
</div>

<?php if ($this->request->session()->read('Auth.User') && ($this->request->session()->read('Auth.User.group_id') == 3)): ?>

    <section class="content-2 simple col-1 col-undefined mbr-after-navbar" id="content5-77">
        <div class="container">
            <div class="row" style="margin-bottom: 25px;">
                <div class="col-md-12">
                    <div class="thumbnail" style="padding-top: 0px !important; padding-bottom: 0px !important;">
                        <div class="caption">
                            <h2 class="subtitle fs21">DASHBOARD</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0px;">
                        <div class="thumbnail merchant-dashboard-box"
                             style="padding-top: 0px !important; padding-bottom: 0px !important;">
                            <div class="caption">
                                <h2 class="subtitle fs15 title-light">Today</h2>

                                <h2 class="subtitle value"><?= $count_today_orders; ?></h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0px;">
                        <div class="thumbnail merchant-dashboard-box"
                             style="padding-top: 0px !important; padding-bottom: 0px !important;">
                            <div class="caption">
                                <h2 class="subtitle fs15 title-light">This week</h2>

                                <h2 class="subtitle value"><?= $count_week_orders; ?></h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0px;">
                        <div class="thumbnail merchant-dashboard-box"
                             style="padding-top: 0px !important; padding-bottom: 0px !important;">
                            <div class="caption">
                                <h2 class="subtitle fs15 title-light">This month</h2>

                                <h2 class="subtitle value"><?= $count_month_orders; ?></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 30px;">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0px;">
                        <div class="thumbnail merchant-dashboard-box"
                             style="padding-top: 0px !important; padding-bottom: 0px !important;">
                            <div class="caption">
                                <h2 class="subtitle fs15 title-light">New Orders</h2>

                                <h2 class="subtitle value"><?= $count_new_orders; ?></h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0px;">
                        <div class="thumbnail merchant-dashboard-box"
                             style="padding-top: 0px !important; padding-bottom: 0px !important;">
                            <div class="caption">
                                <h2 class="subtitle fs15 title-light">Completed</h2>

                                <h2 class="subtitle value"><?= $count_completed_orders; ?></h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0px;">
                        <div class="thumbnail merchant-dashboard-box"
                             style="padding-top: 0px !important; padding-bottom: 0px !important;">
                            <div class="caption">
                                <h2 class="subtitle fs15 title-light">Year</h2>

                                <h2 class="subtitle value"><?= $count_today_orders; ?></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-12">
                    <div class="product_search">
                        <div class="mbr-buttons btn-inverse mbr-buttons--center pl15 pr15">
                            <a class="mbr-buttons__btn btn btn-lg btn-info btn-blue-simple"
                               href="<?php echo $this->Url->build(['controller' => 'orders', 'action' => 'merchant']); ?>">All
                                Orders</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php else: ?>

    <section class="content-2 simple col-1 col-undefined mbr-after-navbar" id="content5-77">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="thumbnail">
                        <div class="caption">
                            <h2 class="subtitle" id="curTime"></h2>
                            <?php if(isset($logged_user)) {
                                echo "<h1> $logged_user Welcome back!<h1>"; }?>

                            <p class="fs21"><br><br><i>You can</i><br></p>

                            <h1 class="home-title">BUILD IT</h1>

                            <h2 class="subtitle">and it will come</h2>

                            <div class="mgt-sm fs21"><p class="fs21"><i>every computer, every part</i> <br></p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="row">
        <div class="col-md-12">
            <div class="product_search">
                <div class="mbr-buttons btn-inverse mbr-buttons--center pl15 pr15">
                    <a class="mbr-buttons__btn btn btn-lg btn-info btn-green-simple"
                       href="<?php echo $this->Url->build(['controller' => 'search', 'action' => 'index']); ?>">Product
                        Search</a>
                </div>
            </div>
        </div>
    </div>
    <?= $this->element('social_footer') ?>
<?php endif; ?>

<script type="text/javascript">
    function viewTime(){
        var day = new Date();
        var cur_hour = day.getHours();
        console.log(cur_hour);
        if (cur_hour <= 10) {
            document.getElementById('curTime').innerHTML="Good morning!";
        }
        else if (cur_hour <= 16) {
            document.getElementById('curTime').innerHTML="Good afternoon!";
        }
        else if (cur_hour <= 20) {
            document.getElementById('curTime').innerHTML="Good evening!";
        }
        else {
            document.getElementById('curTime').innerHTML="Good evening!";
        }
    };
</script>

</body>