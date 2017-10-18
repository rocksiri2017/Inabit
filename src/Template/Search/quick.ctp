<?php
header('Cache-Control: no cache'); //no cache
session_cache_limiter('private_no_expire'); // works
//session_cache_limiter('public'); // works too

if (!empty($products->toArray()) && $products->toArray() > 0) {

    ?>

    <?php $this->start('scriptBottom'); ?>
    <style>
        .dataTables_length, .dataTables_filter, .dataTables_info, .dataTables_paginate, .dataTables_empty {
            display: none;
        }

        .completed-filter {
            cursor: pointer;
            color: #fff;
        }

        .table > thead > tr > th {
            border-bottom: none;
            text-align: center;
            font-size: 20px;
            bottom: 44px;
            position: relative;
        }

        .mgt-sm {
            margin-top: 20px;
            position: absolute;
            margin-left: 40px;
        }
    </style>

    <?php
    $new_sort_type = "asc";
    if (isset($_REQUEST['sort_type'])) {
        $sort_type = $_REQUEST['sort_type'];
        if ($sort_type == 'asc') {
            $new_sort_type = 'desc';
        }
    }
    ?>

    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            $(".clickable-row").click(function () {
                window.document.location = $(this).data("href");
            });
            $(".sort_cls").click(function () {
//		window.location.href = "http://imagine.emoceanlab.com.au/search/quick?sort_type=<?php //echo $new_sort_type;?>//";
            });
        });
    </script>

    <?php $this->end() ?>
    <table class=" table mgt-xs" data-plugin="dataTable">
        <div class="panel-body-header3">
            <h2>
                Your search results for... <br/>
                "<?= $keyword; ?>"
            </h2>

            <div class="absolute_order_filters">
                <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0px;">
                    <!--<a href="#">
                        <div class="col col-md-6 col-sm-6 col-xs-6 completed-filter btn-green-transparent">
                            Sort By
                        </div>
                    </a>
                    <a href="#">
                        <div class="col col-md-6 col-sm-6 col-xs-6 completed-filter btn-green-transparent">
                            Release Date
                        </div>
                    </a>-->
                    <thead>
                    <th class=" col col-md-6 col-sm-6 col-xs-6 completed-filter btn-green-transparent">Sort By</th>
                    <th class=" sort_cls col col-md-6 col-sm-6 col-xs-6 completed-filter btn-green-transparent">Product
                        Name
                    </th>

                    </thead>


                    <?php


                    if ($products->toArray()): ?>
                    <tbody>
                    <?php foreach ($products as $product): ?>
                        <tr class='clickable-row'
                            data-href="<?= $this->Url->build(['controller' => 'products', 'action' => 'view_detail_search', $product->id, 'prefix' => false]) ?>">
                            <td>
                                <?php
                                $image = $product->hero;
                                if ($image && file_exists(WWW_ROOT . $image)) {
                                    echo $this->Html->image('http://' . $_SERVER['HTTP_HOST'] . '/timthumb.php?src=' . $product->hero . '&w=120&h=120&a=t', array('class' => 'img-responsive'));
                                } else {
                                    echo $this->Html->image('http://' . $_SERVER['HTTP_HOST'] . '/timthumb.php?src=' . 'shop_logo.jpg' . '&w=120&h=120&a=t', array('class' => 'img-responsive'));
                                }
                                ?>
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col-md-8">
                                        <p class="no-mg-b mgt-xs"><strong><?=
                                                $this->Text->truncate(
                                                    $product->name,
                                                    30,
                                                    [
                                                        'ellipsis' => '...',
                                                        'exact' => false
                                                    ]
                                                ) ?></strong></p>
                                        <div class="content-product-list"><span class="grey-color"><?=
                                                $this->Text->truncate(
                                                    $product->content,
                                                    30,
                                                    [
                                                        'ellipsis' => '...',
                                                        'exact' => false
                                                    ]
                                                ) ?></span></div>
                                        <div class="content-product-list"><?= $product->created->format('d-m-Y') ?></div>
                                        <?php /* <p class="blue-color"><strong>$<?= number_format((float)$product->price, 2, '.', ''); ?></strong></p>  */ ?>
                                    </div>
                                    <div class="col-md-4 addToCartContainer">
                                       <input type="hidden" class="form-control add-cart-field" value="1">
                                       <a class="mbr-buttons__btn btn btn-lg btn-info btn-green-transparent" style="width: 140px; padding:13px; margin-top:10px;" href="<?php echo $this->Url->build(['controller' => 'search', 'action' => 'advanced',$product->id]); ?>">Add To List</a>
                                    </div>

                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </div>
            </div>
        </div>
    </table>
    <div class="pagination-centered">
        <ul class="pagination">
            <?php if ($this->Paginator->hasPrev()): ?>
                <?= $this->Paginator->prev('?') ?>
            <?php endif; ?>
            <?= $this->Paginator->numbers(['modulus' => 5]) ?>
            <?php if ($this->Paginator->hasNext()): ?>
                <?= $this->Paginator->next('?') ?>
            <?php endif; ?>
        </ul>
    </div>
<?php else: ?>
    <div class="infobox infobox-info mgt-sm">
        <h4 class="text-center">No results found</h4>
        <p class="text-center">
            No products were found for your search, please try again with a different word.<br/><br/>
            <strong>Suggestions :</strong><br/>
            - Check the spelling of your search words.<br/>
            - Try more general keywords.
        </p>
    </div>
<?php endif; ?>
<?php } else { ?>
    <style>
        .product_error h4 {
            color: #68c835 !important;
            font-family: "Arimo", sans-serif;
            font-size: 21px;
        }

    </style>

    <body class="inabit_bg">
    <section class="content-2 simple col-1 col-undefined mbr-after-navbar" id="content5-77">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-center pd-l-lg pd-r-lg white-text head-title">Quick Search</h3>
                    <div class="col-md-12 product_error">
                        <h4 class="text-center pd-l-lg pd-r-lg white-text head-title">Sorry,we couldn't find<br>
                            " <?php if (isset($this->request->data['search']) && !empty($this->request->data['search'])) {
                                echo $this->request->data['search'];
                            } ?>",<br>
                            please try again</h4>
                    </div>
                </div>
            </div>
            <div class="row">

                <div class="col-md-12">
                    <div class="span12">
                        <?= $this->Form->create(null, [
                            'class' => 'form-search form-horizontal',
                            'url' => ['action' => 'quick'],
                            'role' => 'form',
                            'id' => 'custom-search-form'
                        ]) ?>
                        <div class="form-field field-picking">
                            <div class="typeahead-container">
                                <div class="typeahead-field">
				                        <span class="typeahead-query">
				                        	<div class="input-group">
				                                <?= $this->Form->input('search', [
                                                    'id' => 'search_product',
                                                    'class' => 'search-query',
                                                    'label' => false,
                                                    'type' => 'search',
                                                    'placeholder' => 'Search Products',
                                                    'autocomplete' => 'off',
                                                    'data-url' => \Cake\Routing\Router::url(['controller' => 'search', 'action' => 'typeahead']),
                                                    'value' => $this->request->session()->read('Search.Quick.Products.Keyword')
                                                ]) ?>
                                                <div class="input-group-btn">
								                    <div class="btn-group" role="group">
								                        <button type="submit" class="btn btn-primary"><span
                                                                    class="glyphicon glyphicon-search"
                                                                    aria-hidden="true"></span></button>
								                    </div>
								                </div>
				                            </div>
				                        </span>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <?php
            /* <div class="row mgt-sm grey-text">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="col-md-6 col-sm-4 col-xs-4 col-xs-offset-1">
                        <div class="border-separator"></div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-2">
                        <p>or</p>
                    </div>
                    <div class="col-md-6 col-sm-4 col-xs-4">
                        <div class="border-separator"></div>
                    </div>
                </div>
            </div>
            <div class="row mgt-sm">
                <div class="col-md-12">
                    <p class="fs21"><a href="<?= $this->Url->build(['controller' => 'search', 'action' => 'advanced', 'prefix' => false]) ?>">Advanced Search</a></p>
                </div>
            </div>
              */
            ?>
        </div>
    </section>
    </body>

<?php } ?>

