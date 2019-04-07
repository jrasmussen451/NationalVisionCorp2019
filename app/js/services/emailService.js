angular.module('OrderCloud-Mandrill', []);

angular.module('OrderCloud-Mandrill')
    .factory('Email', Email);
;

function Email() {
    var service = {
        send: _send,
        sendCorpReturn: _sendCorpReturn,
        sendCorpDesignRequest: _sendCorpDesignRequest
    };
    return service;

    function _send(parameters) {
        var mandrillAPIKey = "A-7zeLFdtHpLAzWHgpTfMw"; //Enter your API key here
        mandrill_client = new mandrill.Mandrill(mandrillAPIKey);

        var template_name = "national-vision-corporate-inquiry"; //Enter Mandrill Template Slug Here

        var rDATE = '', nDATE = '', eDATE = '', aDATE = '';
        if (parameters.RequestDate && parameters.RequestDate.Value) {
            rDATE = parameters.RequestDate.Value;
        }
        if (parameters.DateNeeded && parameters.DateNeeded.Value) {
            nDATE = parameters.DateNeeded.Value;
        }
        if (parameters.ArtworkDate && parameters.ArtworkDate.Value) {
            aDATE = parameters.ArtworkDate.Value;
        }
        if (parameters.ExpireDate && parameters.ExpireDate.Value) {
            eDATE = parameters.ExpireDate.Value;
        }

        var template_content = [
            {
                "name": "RequestDate",
                "content": rDATE
            },
            {
                "name": "Requestor",
                "content": parameters.Requestor
            },
            {
                "name": "RequestorEmail",
                "content": parameters.RequestorEmail
            },
            {
                "name": "ItemNeeded",
                "content": parameters.ItemNeeded
            },
            {
                "name": "Quote",
                "content": parameters.Quote
            },
            {
                "name": "FinishedSize",
                "content": parameters.FinishedSize
            },
            {
                "name": "DateNeeded",
                "content": nDATE
            },
            {
                "name": "ArtworkDate",
                "content": aDATE
            },
            {
                "name": "PrintColor",
                "content": parameters.PrintColor
            },
            {
                "name": "AdditionalFinishing",
                "content": parameters.AdditionalFinishing
            },
            {
                "name": "VariablePrinting",
                "content": parameters.VariablePrinting
            },
            {
                "name": "Packaging",
                "content": parameters.Packaging
            },
            {
                "name": "Deliver",
                "content": parameters.Deliver
            },
            {
                "name": "AccountingCode",
                "content": parameters.AccountingCode
            },
            {
                "name": "ExpenseType",
                "content": parameters.ExpenseType
            },
            {
                "name": "AvailableOnPortal",
                "content": parameters.AvailableOnPortal
            },
            {
                "name": "UserGroup",
                "content": parameters.UserGroup
            },
            {
                "name": "Category",
                "content": parameters.Category
            },
            {
                "name": "GroupsStoreVisible",
                "content": parameters.GroupsStoreVisible
            },
            {
                "name": "MaxQty",
                "content": parameters.MaxQty
            },
            {
                "name": "ItemInventory",
                "content": parameters.ItemInventory
            },
            {
                "name": "Quantity",
                "content": parameters.Quantity
            },
            {
                "name": "StoreList",
                "content": parameters.StoreList
            },
            {
                "name": "ExpireDate",
                "content": eDATE
            },
            {
                "name": "AdditionalComments",
                "content": parameters.AdditionalComments
            },
            {
                "name": "ReqDateTime",
                "content": parameters.ReqDateTime
            }

        ];
        var attachment = [];
        if (parameters.Attachment.File) {
            attachment.push({"type": parameters.Attachment.File.type,"name": parameters.Attachment.File.name,"content": parameters.Attachment.Data});
        }
        if (parameters.Attachment2.File) {
            attachment.push({"type": parameters.Attachment2.File.type,"name": parameters.Attachment2.File.name,"content": parameters.Attachment2.Data});
        }

        if (parameters.Attachment3.File) {
            attachment.push({"type": parameters.Attachment3.File.type,"name": parameters.Attachment3.File.name,"content": parameters.Attachment3.Data});
        }

        if (parameters.Attachment4.File) {
            attachment.push({"type": parameters.Attachment4.File.type,"name": parameters.Attachment4.File.name,"content": parameters.Attachment4.Data});
        }

        var message = {
            'global_merge_vars': [
                {
                    "name": "Requestor",
                    "content": parameters.Requestor
                },
                {
                    "name": "ItemNeeded",
                    "content": parameters.ItemNeeded
                }

            ],

            'subject':  "Requestor:" + parameters.Requestor + "Item Needed:" + parameters.ItemNeeded + " - " + parameters.ReqDateTime,
            'attachments' : attachment,
            //'from_email': "pschoonmaker@supplylogic.com",
            'from_email': "DoNotReply@four51.com",
            'from_name': "National Vision Corporate Custom Inquiry",
            'to': [
                {
                    'email': "nvici@supplylogic.com",
                    'name': "nvici@supplylogic.com",
                    'type': 'to'
                },
                {
                    'email': parameters.RequestorEmail,
                    'name':  parameters.RequestorEmail,
                    'type': 'cc'
                },
            ],
            'headers': {
                'Reply-To': "nvici@supplylogic.com"
            },
            'important': false
        };
        var async = false;
        var ip_pool = "Main Pool";

        mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
            console.log(result);
        }, function(e) {
            console.log('A Mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    }

    function _sendCorpReturn(parameters) {
        var mandrillAPIKey = "A-7zeLFdtHpLAzWHgpTfMw"; //Enter your API key here
        mandrill_client = new mandrill.Mandrill(mandrillAPIKey);

        var template_name = "national-vision-corporate-return"; //Enter Mandrill Template Slug Here

        var rDATE = '';
        if (parameters.RequestDate && parameters.RequestDate.Value) {
            rDATE = parameters.RequestDate.Value;
        }

        var template_content = [
            {
                "name": "RequestDate",
                "content": rDATE
            },
            {
                "name": "Requestor",
                "content": parameters.Requestor
            },
            {
                "name": "RequestorEmail",
                "content": parameters.RequestorEmail
            },
            {
                "name": "ReturnType",
                "content": parameters.ReturnType
            },
            {
                "name": "OrderNumber",
                "content": parameters.OrderNumber
            },
            {
                "name": "ItemNumber",
                "content": parameters.ItemNumber
            },
            {
                "name": "Comments",
                "content": parameters.Comments
            },

            {
                "name": "ReqDateTime",
                "content": parameters.ReqDateTime
            }

        ];
        var attachment = [];
        if (parameters.Attachment.File) {
            attachment.push({"type": parameters.Attachment.File.type,"name": parameters.Attachment.File.name,"content": parameters.Attachment.Data});
        }
        if (parameters.Attachment2.File) {
            attachment.push({"type": parameters.Attachment2.File.type,"name": parameters.Attachment2.File.name,"content": parameters.Attachment2.Data});
        }

        if (parameters.Attachment3.File) {
            attachment.push({"type": parameters.Attachment3.File.type,"name": parameters.Attachment3.File.name,"content": parameters.Attachment3.Data});
        }

        if (parameters.Attachment4.File) {
            attachment.push({"type": parameters.Attachment4.File.type,"name": parameters.Attachment4.File.name,"content": parameters.Attachment4.Data});
        }

        var message = {
            'global_merge_vars': [
                {
                    "name": "Requestor",
                    "content": parameters.Requestor
                },
                {
                    "name": "ItemNumber",
                    "content": parameters.ItemNumber
                }

            ],

            'subject':  "Requestor:" + parameters.Requestor + "Order Number:" + parameters.OrderNumber + " - " + parameters.ReqDateTime,
            'attachments' : attachment,
            //'from_email': "pschoonmaker@supplylogic.com",
            'from_email': "DoNotReply@four51.com",
            'from_name': "National Vision Corporate Return To Inventory",
            'to': [
                {
                    'email': "NVIReturns@supplylogic.com",
                    'name': "NVIReturns@supplylogic.com",
                    'type': 'to'
                },
                {
                    'email': parameters.RequestorEmail,
                    'name':  parameters.RequestorEmail,
                    'type': 'cc'
                },
            ],
            'headers': {
                'Reply-To': "NVIReturns@supplylogic.com"
            },
            'important': false
        };
        var async = false;
        var ip_pool = "Main Pool";

        mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
            console.log(result);
        }, function(e) {
            console.log('A Mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    }

    function _sendCorpDesignRequest(parameters) {
        var mandrillAPIKey = "A-7zeLFdtHpLAzWHgpTfMw"; //Enter your API key here
        mandrill_client = new mandrill.Mandrill(mandrillAPIKey);

        var template_name = "national-vision-corporate-design-request"; //Enter Mandrill Template Slug Here

        var dDATE = '', nDATE = '', aDATE = '';
        if (parameters.DraftDate && parameters.DraftDate.Value) {
            dDATE = parameters.DraftDate.Value;
        }
        if (parameters.DateNeeded && parameters.DateNeeded.Value) {
            nDATE = parameters.DateNeeded.Value;
        }
        if (parameters.DueDate && parameters.DueDate.Value) {
            aDATE = parameters.DueDate.Value;
        }

        var template_content = [
            {
                "name": "Name",
                "content": parameters.Name
            },
            {
                "name": "Department",
                "content": parameters.Department
            },
            {
                "name": "DateNeeded",
                "content": nDATE
            },
            {
                "name": "DraftDate",
                "content": dDATE
            },
            {
                "name": "DueDate",
                "content": aDATE
            },
            {
                "name": "RushJob",
                "content": parameters.RushJob
            },
            {
                "name": "NVICreativeMedium",
                "content": parameters.NVICreativeMedium
            },
            {
                "name": "NVIFinalPiece",
                "content": parameters.NVIFinalPiece
            },
            {
                "name": "Audience",
                "content": parameters.Audience
            },
            {
                "name": "HowUsed",
                "content": parameters.HowUsed
            },
            {
                "name": "NewRevised",
                "content": parameters.NewRevised
            },
            {
                "name": "JobName",
                "content": parameters.JobName
            },
            {
                "name": "Brand",
                "content": parameters.Brand
            },
            {
                "name": "Images",
                "content": parameters.Images
            },
            {
                "name": "Body",
                "content": parameters.Body
            },
            {
                "name": "Legal",
                "content": parameters.Legal
            },
            {
                "name": "Size",
                "content": parameters.Size
            },
            {
                "name": "Type",
                "content": parameters.Type
            },
            {
                "name": "Tone",
                "content": parameters.Tone
            },
            {
                "name": "Color",
                "content": parameters.Color
            },
            {
                "name": "Other",
                "content": parameters.Other
            },
            {
                "name": "DNote",
                "content": parameters.DNote
            },
            {
                "name": "1stDelivery",
                "content": parameters.FirstDelivery
            },
            {
                "name": "2ndDelivery",
                "content": parameters.SecondDelivery
            },
            {
                "name": "Completed",
                "content": parameters.Completed
            },
            {
                "name": "Approval",
                "content": parameters.Approval
            },
            {
                "name": "AppNeeded",
                "content": parameters.AppNeeded
            },
            {
                "name": "ReqDateTime",
                "content": parameters.ReqDateTime
            }

        ];
        var attachment = [];
        if (parameters.Attachment.File) {
            attachment.push({"type": parameters.Attachment.File.type,"name": parameters.Attachment.File.name,"content": parameters.Attachment.Data});
        }
        if (parameters.Attachment2.File) {
            attachment.push({"type": parameters.Attachment2.File.type,"name": parameters.Attachment2.File.name,"content": parameters.Attachment2.Data});
        }

        if (parameters.Attachment3.File) {
            attachment.push({"type": parameters.Attachment3.File.type,"name": parameters.Attachment3.File.name,"content": parameters.Attachment3.Data});
        }

        if (parameters.Attachment4.File) {
            attachment.push({"type": parameters.Attachment4.File.type,"name": parameters.Attachment4.File.name,"content": parameters.Attachment4.Data});
        }


        var message = {
            'global_merge_vars': [
                {
                    "name": "Name",
                    "content": parameters.Name
                },
                {
                    "name": "Department",
                    "content": parameters.Department
                }

            ],

            'subject':  "Name:" + parameters.Name + "Department:" + parameters.Department + " - " + parameters.ReqDateTime,
            'attachments' : attachment,
            //'from_email': "pschoonmaker@supplylogic.com",
            'from_email': "DoNotReply@four51.com",
            'from_name': "National Vision Corporate Creative Request",
            'to': [
                {
                    'email': "nvidesigns@supplylogic.com",
                    'name': "nvidesigns@supplylogic.com",
                    'type': 'to'
                },
                {
                    'email': parameters.RequestorEmail,
                    'name':  parameters.RequestorEmail,
                    'type': 'cc'
                },
            ],
            'headers': {
                'Reply-To': "nvidesigns@supplylogic.com"
            },
            'important': false
        };
        var async = false;
        var ip_pool = "Main Pool";

        mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
            console.log(result);
        }, function(e) {
            console.log('A Mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    }
}