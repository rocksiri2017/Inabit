<?php $this->start('scriptBottom'); ?>
<style>
.dataTables_length,.dataTables_filter,.dataTables_info,.dataTables_paginate,.dataTables_empty{
	display:none;
}
.completed-filter{
	cursor:pointer;
	color:#fff;
}
.table > thead > tr > th {	
	border-bottom:none;
	text-align: center;
	font-size: 20px;
	bottom: 54px;
	position: relative;
}
.mgt-sm {
    margin-top: 20px;
    position: absolute;
    margin-left: 40px;
}
</style>
<script type="text/javascript">
   	jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
});
</script>

<?php $this->end() ?>

<table class=" table mgt-xs" data-plugin="dataTable">
<div class="panel-body-header3">
	<h2>
		<?= $shop->name; ?> Products
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
				<th class=" col col-md-6 col-sm-6 col-xs-6 completed-filter btn-green-transparent">Product Name</th>
            </thead>
		</div>
	</div>
</div>

<?php if($products->toArray()): ?>
	
		<tbody>
			<?php foreach($products as $product): ?>
				<!--<tr class='clickable-row' data-href="< ?= $this->Url->build(['controller' => 'products', 'action' => '/' . $product->slug . '.' . $product->id, 'prefix' => false]) ?>">-->
				
				<tr class='clickable-row' data-href="<?= $this->Url->build(['controller' => 'products', 'action' => 'view_detail', $product->id, 'prefix' => false]) ?>">
					<td width="120px">
						<?= $this->Html->image($product->hero, ['class' => 'img-responsive', 'style' => 'width: 120px; height: 70px; margin-top: 5px;']) ?>
					</td>
					<td>
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
                        <p class="blue-color"><strong>$<?= number_format((float)$product->price, 2, '.', ''); ?></strong></p>
						
					</td>
				</tr>
			<?php endforeach; ?>
		</tbody>
	</table>
	<div class="pagination-centered">
		<ul class="pagination">
			<?php if ($this->Paginator->hasPrev()): ?>
				<?= $this->Paginator->prev('«') ?>
			<?php endif; ?>
			<?= $this->Paginator->numbers(['modulus' => 5]) ?>
			<?php if ($this->Paginator->hasNext()): ?>
				<?= $this->Paginator->next('»') ?>
			<?php endif; ?>
		</ul>
	</div>
<?php else: ?>
	<div class="infobox infobox-info mgt-sm">
		<h4 class="text-center">No products found</h4>
		<p class="text-center">
			No products were found for this shop.
		</p>
	</div>
<?php endif; ?>