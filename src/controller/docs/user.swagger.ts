/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the user
 *           example: 0
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "user@brettonwoods.gold"
 *         email_confirmed:
 *           type: boolean
 *           description: Indicates if the user's email is confirmed
 *           example: false
 *         failed_attempts:
 *           type: integer
 *           description: Number of failed login attempts
 *           example: 0
 *         google_mfa_activated:
 *           type: boolean
 *           description: Indicates if Google MFA is activated
 *           example: false
 *         kyc_status:
 *           type: string
 *           description: KYC verification status
 *           example: "approved"
 *         kyc_status_reason:
 *           type: string
 *           description: Reason for the current KYC status
 *           example: "Fraud"
 *         last_sign_in_at:
 *           type: string
 *           format: date-time
 *           description: Date and time of the last sign-in
 *           example: "2022-06-01T05:21:43.690Z"
 *         locked_at:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was locked, if applicable
 *           example: "2022-06-01T05:21:43.690Z"
 *         subscribed:
 *           type: boolean
 *           description: Indicates if the user is subscribed
 *           example: false
 *         wallet_address:
 *           type: string
 *           description: Current wallet address associated with the user
 *           example: "BdQsMYLAhDDNRsDLniETbF2V"
 *         wallet_address_candidate:
 *           type: string
 *           description: New wallet address candidate, if any
 *           example: "BdQsMYLAhDDNRsDLniETbF2V"
 *         wallet_type:
 *           type: string
 *           description: Type of wallet used by the user
 *           example: "metamask"
 *         wallet_type_candidate:
 *           type: string
 *           description: New wallet type candidate, if any
 *           example: "metamask"
 *         user_type:
 *           type: string
 *           description: Type of user (e.g., affiliate)
 *           example: "affiliate"
 *         referral_token:
 *           type: string
 *           description: Referral token associated with the user
 *           example: "p8RyKA"
 *         payout_address:
 *           type: string
 *           description: Address for user payouts
 *           example: "BdQsMYLAhDDNRsDLniETbF2V"
 *         downline_users_count:
 *           type: integer
 *           description: Number of downline users under this user
 *           example: 0
 *         status:
 *           type: string
 *           description: Current status of the user
 *           example: "inactive"
 *         status_reason:
 *           type: string
 *           description: Reason for the user's status
 *           example: "Fraud"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created
 *           example: "2022-06-01T05:21:43.690Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was last updated
 *           example: "2022-06-01T05:21:43.690Z"
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the user
 *           example: 0
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "user@brettonwoods.gold"
 *         email_confirmed:
 *           type: boolean
 *           description: Indicates if the user's email is confirmed
 *           example: false
 *         failed_attempts:
 *           type: integer
 *           description: Number of failed login attempts
 *           example: 0
 *         google_mfa_activated:
 *           type: boolean
 *           description: Indicates if Google MFA is activated
 *           example: false
 */
