
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>IN A BIT Email</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0;">

    <table cellspacing="0" cellpadding="0" border="0" style="color: #333; background: #fff; padding: 0; margin: 0; width: 100%; font: 15px 'Helvetica Neue', Arial, Helvetica;">
    	<tbody>
    		<tr width="100%">
    			<td valign="top" align="left" style="background: #f0f0f0; font: 15px 'Helvetica Neue', Arial, Helvetica;">
    				<table style="border: none; padding: 0 18px; margin: 50px auto; width: 500px;">
    					<tbody>
    	 					<tr width="100%" height="75">
    	 						<td valign="top" align="left" style="border-top-left-radius: 4px; border-top-right-radius: 4px; background: #000; padding: 12px 25px; text-align: center;">
     								<?= $this->Html->image('website/in-a-bit-logo.png', [
                                                                                'fullBase' => true,
                                                                                'width'  => '120',
                                                                                'height' => '50',
                                                                                'alt' => 'IN A BIT Header',
                                                                                'url' => ['controller' => 'pages', 'action' => 'home', '_full' => true]
                                                                            ]) ?>
     							</td>
     						</tr>

     						<tr width="100%">
     							<td valign="top" align="left" style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; background:#fff; padding: 18px;">
     								<h1 style="font-size: 20px; margin: 0; color: #333;"> <?= 'Hello, ', h($name) ?> </h1>
     								<p style="font: 15px/1.25em 'Helvetica Neue', Arial, Helvetica; color: #333;"> We heard you need a password reset. Click the link below and you'll be redirected to a secure site from which you can set a new password. </p>
     								<p style="font: 15px/1.25em 'Helvetica Neue', Arial, Helvetica; margin-bottom: 0; text-align: center; color: #333;">
     								    <?=
                                            'To complete this process, please follow this link : ',
                                            $this->Html->link(
                                                ' Reset Password ',
                                                [
                                                    '_name' => 'users-resetpassword',
                                                    'id' => $userId,
                                                    'code' => $code,
                                                    '_full' => true
                                                ],
                                                [
                                                    'style' => 'border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; background: #3AA54C; color: #fff; cursor: pointer; display: block; font-weight: 700; font-size: 16px; line-height: 1.25em; margin: 24px auto 24px; padding: 10px 18px; text-decoration: none; width: 180px; text-align: center;'
                                                ]
                                            )
                                        ?>
     								</p>
    							</td>
    						</tr>
    			 		</tbody>
     				</table>
     		</tbody>
     </table>
</body>
</html>