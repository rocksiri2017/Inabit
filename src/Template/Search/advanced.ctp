
<?php use Cake\Routing\Router; ?>


<body class="inabit_bg">
	<section class="content-2 simple col-1 col-undefined mbr-after-navbar" id="content5-77">
	    <div class="container">
	        <div class="row">
	        	<div class="col-md-12">
	            	<h3 class="text-center white-text head-title">Search Stores</h3>
	            </div>
	        </div>
			<div class="row">
                <div class="col-md-12">
                    <?= $this->Flash->render() ?>
                </div>
            </div>
			<div class="row">
			
				<div class="col-md-12">
			         <?= $this->Form->create(null, [
                        'class' => 'form-search form-horizontal',
                        'url' => ['action' => 'advanced'],
                        'role' => 'form',
                        'id' => 'custom-search-form'
                    ]) ?>
                    <div class="inputs"><?= $this->element('Search/advanced') ?></div>
		        </div>
			</div>

			<div class="row">
					<div class="mbr-buttons btn-inverse mbr-buttons--center pl15 pr15">

					</div>
			</div>

			<div class="row">
                <div class="col-md-12">
                     <div class="add_another_product">
                        <div class="mbr-buttons btn-inverse mbr-buttons--center pl15 pr15">
                            <a class="mbr-buttons__btn btn btn-lg btn-info btn-green-simple duplicate-form-field" data-url="<?php echo $this->Url->build(['controller' => 'search', 'action' => 'input']); ?>">Add Another Product</a>
                        </div>
                    </div>
                </div>
            </div>

			<div class="row">
		        <div class="col-md-12">
		            <div class="product_search">
		                <div class="mbr-buttons btn-inverse mbr-buttons--center pl15 pr15">
		                    <button class="mbr-buttons__btn btn btn-lg btn-info btn-green-simple" type="submit" href="<?php echo $this->Url->build(['controller' => 'search', 'action' => 'index']); ?>">
		                    Search Stores</button>
		                </div>
		            </div>
		        </div>
		    </div>
			
		 </form>
	    </div>
	</section>
</body>