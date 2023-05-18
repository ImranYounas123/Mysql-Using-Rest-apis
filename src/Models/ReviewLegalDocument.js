const mongoose = require("mongoose");
let { Schema } = mongoose;
const ReviewLegalDocumentSchema = mongoose.Schema({

    disclaimer: [
        {
            lastUpdated : {
                type : String,
            },
            disclaimer: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            ExternalLinks: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            MediacalInfo: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            MeTestonomial: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
        },
    ],
    termsConditions: [
        {
            lastUpdated : {
                type : String,
            },
            agreementTearms: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            intelectualProperty: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            userPresentaion: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            userRegistration: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
        },
    ],
    privacyPolicy: [
        {
            lastUpdated : {
                type : String,
            },
            Privacy: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            Summery: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            SummeryOfKeyPoints: {
                // _id: {
                //     type: Schema.Types.ObjectId, // use ObjectId data type for _id
                //     default: mongoose.Types.ObjectId // set default value to generate new ObjectId
                // },
                content: [
                    {
                        Head: {
                            type: String
                        },
                        body: {
                            type: String
                        }
                    }
                ]
            },
            
        },
    ]
});

const ReviewLegalDocument = mongoose.model("ReviewLegalDocument", ReviewLegalDocumentSchema);

module.exports = ReviewLegalDocument;