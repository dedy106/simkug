<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <!-- Cross compatibility -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title> Midtrans Online Payment </title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="shortcut icon" type="image/x-icon" href="https://midtrans.com/assets/favicons-1473b1/favicon.ico" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.css">
</head> 
<body>
    <!-- For Sandbox -->
    <script type="text/javascript" src="https://api.sandbox.midtrans.com/v2/assets/js/veritrans.js"></script>

    <!-- For Production -->
    <!-- <script type="text/javascript" src="https://api.midtrans.com/v2/assets/js/veritrans.js"></script> -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.js"></script>
    
    <h1>Checkout</h1>

    <fieldset>
        <legend>Testing Card That You Can Use</legend>
        <code>
            <pre>
<b>3D Secure Success Testing Card:</b>
Visa        4811 1111 1111 1114
MasterCard  5211 1111 1111 1117

<b>3D Secure Denied by Bank Testing Card:</b>
Visa        4911 1111 1111 1113
MasterCard  5111 1111 1111 1118

<b>3D Secure Challenge by FDS Testing Card:</b>
Visa        4511 1111 1111 1117 
MasterCard  5510 1111 1111 1115 
            </pre>
        </code>
    </fieldset>

    <br>

    <form action="#" method="POST" id="payment-form">
        <fieldset>
            <legend>Checkout</legend>
            <p>
                <label>Card Number</label>
                <input class="card-number" value="4811 1111 1111 1114" size="23" type="text" autocomplete="off" />
            </p>
            <p>
                <label>Expiration (MM/YYYY)</label>
                <input class="card-expiry-month" value="12" placeholder="MM" size="2" type="text" />
                <span> / </span>
                <input class="card-expiry-year" value="2020" placeholder="YYYY" size="4" type="text" />
            </p>
            <p>
                <label>CVV</label>
                <input class="card-cvv" value="123" size="4" type="text" autocomplete="off" />
            </p>

            <p>
                <label>3D Secure</label>
                <input type="checkbox" name="secure" value="true" checked>
            </p>

            <p>
                <label>Save credit card</label>
                <input type="checkbox" name="save_cc" value="true">
            </p>

            <input id="token_id" name="token_id" type="hidden" />
            <button class="submit-button">Submit Payment</button>
        </fieldset>
    </form>
    
    <br>

    <fieldset>
        <legend><h2>Token Result</h2></legend>
        <h3 style="text-align:center" id='token_result'>
            Please Click Submit Payment First.
        </h3>
    </fieldset>

    <!-- Javascript for token generation -->
    <script type="text/javascript">
        $(function () {
            // TODO: Change with your client key.
            // Can be found in Merchant Portal (dashboard.midtrans.com) -> Settings -> Access keys
            Veritrans.client_key = "<Your-Client-Key-Here>";

            if(Veritrans.client_key.substring(1, 5) == "Your"){
                Veritrans.client_key = prompt("(edit index.html and place your client key at \"<Your-Client-Key-Here>\")\nOr \nInput Your [Sandbox] Client Key Here :", "");
            }

            // API Url for Sandbox 
            Veritrans.url = "https://api.sandbox.midtrans.com/v2/token";

            // API Url for Production
            // Veritrans.url = "https://api.midtrans.com/v2/token";
            
            var card = function () {
                return {
                    "card_number": $(".card-number").val(),
                    "card_exp_month": $(".card-expiry-month").val(),
                    "card_exp_year": $(".card-expiry-year").val(),
                    "card_cvv": $(".card-cvv").val(),
                    "secure": $('[name=secure]')[0].checked,
                    "gross_amount": 100000
                }
            };

            function callback(response) {
                console.log(response);
                if (response.redirect_url) {
                    console.log("3D SECURE");
                    // 3D Secure transaction, please open this popup
                    openDialog(response.redirect_url);
                }
                else if (response.status_code == "200") {
                    // Success 3-D Secure or success normal
                    console.log(response.status_code);
                    alert(response.status_message);
                    closeDialog();
                    $('button').removeAttr("disabled");
                    $("#token_id").val(response.token_id);
                    $("#token_result").html(response.token_id);
                } 
                else {
                    // Failed request token
                    closeDialog();
                    console.log(response.status_code);
                    alert(response.status_message);
                    $('button').removeAttr("disabled");
                    $("#token_result").html(response.status_message + '. Please Try Again');
                }
            }

            function openDialog(url) {
                $.fancybox.open({
                    href: url,
                    type: "iframe",
                    autoSize: false,
                    width: 700,
                    height: 500,
                    closeBtn: false,
                    modal: true
                });
            }

            function closeDialog() {
                $.fancybox.close();
            }

            $(".submit-button").click(function (event) {
                console.log("SUBMIT");
                event.preventDefault();
                $(this).attr("disabled", "disabled");
                Veritrans.token(card, callback);
                return false;
            });
        });
    </script>
</body>
<html>
