four51.app.factory('Email', ['$resource', '$451', function($resource, $451) {

    var _send = function(emailDetails) {
        var mandrillAPIKey = "A-7zeLFdtHpLAzWHgpTfMw"; // they currently are not using madrill but change key in case of future use
        mandrill_client = new mandrill.Mandrill(mandrillAPIKey);

        var template_name = "national-vision-contact-us";

        var formattedPhone = '(' +  emailDetails.Phone.substring(0,3) + ') ' + emailDetails.Phone.substring(3,6) + '-' + emailDetails.Phone.substring(6,10);

        var template_content = [
            {
                "name": 'name',
                "content": emailDetails.Name
            },
            {
                "name": 'phone',
                "content": formattedPhone
            },
            {
                "name": 'email',
                "content": emailDetails.Email
            },
            {
                "name": 'comment',
                "content": emailDetails.Comment
            }
        ];
        var message = {
            'subject': "National Vision Contact Us",
            'from_email': "DoNotReply@four51.com",
            'from_name': "National Vision Contact Us",
            'to': [
               {
                    'email': "dhand@supplylogic.com",
                    'name': "dhand@supplylogic.com",
                    'type': 'to'
                },
                {
                    'email': "tconstien@supplylogic.com",
                    'name': "tconstien@supplylogic.com",
                    'type': 'to'
                },
                {
                    'email': "keaton@supplylogic.com",
                    'name': "keaton@supplylogic.com",
                    'type': 'to'
                },
                {
                    'email': emailDetails.Email,
                    'name': emailDetails.Name,
                    'type': 'cc'
                },
            ],
            'important': false
        };
        var async = false;
        var ip_pool = "Main Pool";

        mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
            console.log(result);
        }, function(e) {
            console.log('A Mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    };

    return {
        send: _send
    }
}]);