<?= $this->assign('title', 'Update a product') ?>
<?php use Cake\Routing\Router; ?>

<?php $this->start('scriptBottom');
echo $this->Html->script('ckeditor/ckeditor') ?>
<script type="text/javascript">
  CKEDITOR.replace('articleBox', {
    customConfig: 'config/article.js'
  });
</script>

<script>
$( document ).ready(function() {
  console.log( "ready!" );
  var unique_id = '<?= $product->slug . '-' . $product->id; ?>';
  var controller_name = 'products';

  Dropzone.options.myDropzone = {
    maxFilesize: 1,
    dictResponseError: 'Server not Configured',
    acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
    addRemoveLinks: true,
     removedfile: function(file) {
        var name = file.name;  

        var image = {
            id: name,
            unique_id: unique_id
        }

        $.ajax({
            type: 'post',
            url: '<?php echo Router::url('/', true); ?>admin/' + controller_name + '/deleteImage?portfolio_id=<?= $product->id; ?>',
            dataType: "json",
            data : image,
            success: function (data) {
              console.log(data);
            }
        });
        var _ref;
      return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;        
    },
    init: function() {
        var thisDropzone = this;
        $.getJSON('<?php echo Router::url('/', true); ?>admin/' + controller_name + '/getImages?unique_id=' + unique_id, function(data) { 
            $.each(data.result, function(key,value){ 
                var mockFile = { name: value.name, size: value.size }; 
                thisDropzone.options.addedfile.call(thisDropzone, mockFile);
                thisDropzone.createThumbnailFromUrl(mockFile, value.url);
                thisDropzone.emit("complete", mockFile);
            });
        });
      }
  };
});
</script>

<?php $this->end() ?>

 <!-- Page -->
  <div class="page animsition">
    <div class="page-header">
      <h1 class="page-title">Update product</h1>
      <ol class="breadcrumb">
        <li>
        <?= $this->Html->link(('Dashboard'), ['controller' => 'admin',
            'action' => 'home', 'prefix' => 'admin'], ['escape' => false]) ?>
        </li>
        <li>
          <?= $this->Html->link(('Products'), ['controller' => 'products',
            'action' => 'index', 'prefix' => 'admin'], ['escape' => false]) ?>
        </li>
        <li class="active"><?= $product->name; ?></li>
      </ol>
    </div>
    <div class="page-content container-fluid">

      <!-- Change /upload-target to your upload address -->
    

      <?= $this->Form->create($product, [
        'class' => 'form-horizontal',
        'role' => 'form',
        'type' => 'file'
      ]) ?>
      <div class="row">
        <div class="col-sm-6">
          <!-- Panel Static Lables -->
          <div class="panel">
            <div class="panel-heading">
              <h3 class="panel-title">General</h3>
            </div>
            <div class="panel-body container-fluid">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group form-material">
                    <label class="control-label" for="inputText">Name</label>
                    <?= $this->Form->input('name', ['class' => 'form-control', 'label' => false]) ?>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-material">
                    <label class="control-label" for="inputPassword">Show/Hide</label>
                    <select class="form-control" name="is_display">
                      <option value="1">Show</option>
                      <option value="0">Hide</option>
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <?php if ($product->is_admin == 1) {?>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group form-material">
                    <label class="control-label" for="width">Width</label>
                    <?= $this->Form->input('width', ['class' => 'form-control', 'label' => false]) ?>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-material">
                    <label class="control-label" for="height">Height</label>
                    <?= $this->Form->input('height', ['class' => 'form-control', 'label' => false]) ?>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group form-material">
                    <label class="control-label" for="brand">Brand</label>
                    <?= $this->Form->input('brand', ['class' => 'form-control', 'label' => false]) ?>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-material">
                    <label class="control-label" for="depth">Depth</label>
                    <?= $this->Form->input('depth', ['class' => 'form-control', 'label' => false]) ?>
                  </div>
                </div>
              </div>
              <?php } ?>
              <!--<div class="row">
                <div class="col-md-6">
                  <div class="form-group form-material">
                    <label class="control-label" for="inputText">Code</label>
                    < ?= $this->Form->input('product_code', ['class' => 'form-control', 'label' => false]) ?>
                  </div>
                </div>
              </div>-->
             
              <div class="col-md-6" style="padding-left: 0px;">
                <div class="form-group">
                  <label class="control-label"><strong>Hero File</strong></label>
                  <div class="fileinput">
                    <?php if (!empty($product->hero)) : ?>
                      <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 100px; margin-top: 10px;">
                        <?= $this->Html->image($product->hero, ['style' => 'max-width: 200px; max-height: 100px;']) ?>
                      </div>
                    <?php endif; ?>
                    <div>
                      <span class="btn btn-default btn-file">
                        <?= $this->Form->input('hero_file', ['type' => 'file', 'label' => false, 'templates' => [
                          'inputContainer' => '{{content}}</span>',
                          'inputContainerError' => '{{content}}</span>{{error}}'
                        ]]) ?>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Panel Static Lables -->
        </div>

        <div class="col-sm-6">
          <div class="panel">
            <div class="panel-heading">
              <h3 class="panel-title">Content</h3>
            </div>
            <div class="panel-body container-fluid">

              <div class="form-group">
                <?= $this->Form->input(
                  'content', [
                    'label' => false,
                    'class' => 'form-control articleBox',
                    'id' => 'articleBox'
                  ]
                ) ?>
              </div>

              <div class="panel-heading">
                <h3 class="panel-title" style="padding-left: 0px;">Other</h3>
              </div>

              <div class="form-group form-material">
                <label class="control-label" for="inputText">Weight</label>
                <?= $this->Form->input('weight', ['class' => 'form-control', 'label' => false]) ?>
              </div>
              <div class="form-group form-material">
                  <label class="control-label" for="inputText">Product Tags</label>
                  <?= $this->Form->input('tags', ['type'=> 'text', 'class' => 'form-control', 'label' => false]) ?>
              </div>
              <div class="form-group form-material">
                <label class="control-label" for="inputText">Product Code</label>
                <?= $this->Form->input('product_code', ['class' => 'form-control', 'label' => false]) ?>
              </div>

            </div>
          </div>
          <!-- End Panel Floating Lables -->
        </div>
      </div>
    <div class="row">
      <div class="pull-right">
      	<div class="col-md-12">
        	<?= $this->Form->button('Save Product', ['class' => 'btn btn-block btn-success']) ?>
        </div>
      </div>
    </div>
    <?= $this->Form->end() ?>
    </div>
  </div>
  <!-- End Page -->
