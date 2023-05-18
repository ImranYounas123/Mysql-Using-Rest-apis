const ReviewLegalDocumentModel = require('../models/ReviewLegalDocument');

const ReviewLegalDocumentClt = {
    createReviewLegalDocument: async (req, res) => {
        try {

            const { disclaimer, termsConditions, privacyPolicy } = req.body;

            const dis = await ReviewLegalDocumentModel.create({
                disclaimer, termsConditions, privacyPolicy
            });
            res.status(201).json({
                success: true,
                dis
            });
        } catch (err) {
            res.status(201).json({
                success: false,
                Error: err.stack,
            });
        }
    },
    getReviewLegalDocument: async (req, res) => {
        try {
            const ReviewLegalDocument = await ReviewLegalDocumentModel.find({});
            let disclaimer = [];
            let termsConditions = [];
            let privacyPolicy = [];
            let lastUpdatedDes = ReviewLegalDocument[1].disclaimer[0].lastUpdated
            let disclaimerh1 = ReviewLegalDocument[1].disclaimer[0].disclaimer.content[0];
            let disclaimerh2 = ReviewLegalDocument[1].disclaimer[0].ExternalLinks.content[0];
            let disclaimerh3 = ReviewLegalDocument[1].disclaimer[0].MediacalInfo.content[0];
            let disclaimerh4 = ReviewLegalDocument[1].disclaimer[0].MeTestonomial.content[0];
            disclaimer.push({lastUpdated : lastUpdatedDes},disclaimerh1, disclaimerh2, disclaimerh3, disclaimerh4)
            let lastUpdatedTerms = ReviewLegalDocument[1].termsConditions[0].lastUpdated
            let termsConditions1 = ReviewLegalDocument[1].termsConditions[0].agreementTearms.content[0];
            let termsConditions2 = ReviewLegalDocument[1].termsConditions[0].intelectualProperty.content[0];
            let termsConditions3 = ReviewLegalDocument[1].termsConditions[0].userPresentaion.content[0];
            let termsConditions4 = ReviewLegalDocument[1].termsConditions[0].userRegistration.content[0];
            termsConditions.push({lastUpdated : lastUpdatedTerms} ,termsConditions1, termsConditions2, termsConditions3, termsConditions4)
            let lastUpdatedPolicy = ReviewLegalDocument[1].privacyPolicy[0].lastUpdated
            let privacyPolicy1 = ReviewLegalDocument[1].privacyPolicy[0].Privacy.content[0];
            let privacyPolicy2 = ReviewLegalDocument[1].privacyPolicy[0].Summery.content[0]
            let privacyPolicy3 = ReviewLegalDocument[1].privacyPolicy[0].SummeryOfKeyPoints.content[0];
            privacyPolicy.push({lastUpdated : lastUpdatedPolicy},privacyPolicy1, privacyPolicy2, privacyPolicy3)
            res.status(201).json(
                { disclaimer: disclaimer, termsConditions: termsConditions, privacyPolicy: privacyPolicy }
            );

        } catch (err) {
            res.status(201).json({
                success: false,
                Error: err.stack,
            });
        }
    },
    updateReviewLegalDocument: async (req, res) => {
        try {

            const ReviewLegalDocument = await ReviewLegalDocumentModel.findByIdAndUpdate(getReviewLegalDocument._id, req.body, { new: true });
            res.status(201).json(
                ReviewLegalDocument,
            );
        } catch (err) {
            res.status(201).json({
                success: false,
                Error: err.message,
            });
        }
    },
};
// var print1_10 = function (n, x) {
//     if (n === 0) {
//         return 1
//     }
//     if(n === 1){
//         return 
//     }
//       let _x =   print1_10(x, n - 1)
//       let y = x * _x;
//        console.log(y);
// }
// console.log(print1_10(5, 2));
// var print1_10 = function (n, a, b) {
//     // 1. best case
//     if (n === 0) {
//         return;
//     }
//     // 2. what this fun perform
//     console.log(a);
//     //    0,1,1,2,3,5,8
//     let c = a + b;
//     a = b; //0 ,1, 1 ,2,3,5,8
//     b = c; //1 ,2,3,5
//     print1_10(n-1, a, b)
// }
// // 3. initial given value
// // a =0, b = 1 
// print1_10(7, 0, 1);


// var findMedianSortedArrays = function (nums1, nums2) {
//     let copyArray = [...nums1, ...nums2].sort();
//     // console.log(copyArray)
//     let mid = Math.floor(copyArray.length / 2)
//     let getMedian = copyArray.length % 2 == 0 ? (copyArray[mid] + copyArray[mid - 1]) / 2 : copyArray[mid]
//     // console.log(getMedian);

//     // if(copyArray.length % 2 !== 0){
//     //     if(copyArray.length === 3) {
//     //       console.log(copyArray[1]);
//     //     }else{
//     //     let midValue = (copyArray.length / 2) + 0.5;
//     //     console.log(copyArray[midValue-1]);             
//     //     }
//     // }else{
//     //     let mid1 = (copyArray.length / 2) - 1
//     //     let mid2 = mid1 + 1 
//     //     console.log((copyArray[mid1] + copyArray[mid2]) / 2);
//     // }
// };
// findMedianSortedArrays(
//     [3]
//     , [-2, -1]);

module.exports = ReviewLegalDocumentClt;