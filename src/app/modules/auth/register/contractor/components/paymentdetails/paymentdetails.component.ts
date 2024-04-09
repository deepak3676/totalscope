/*
	FILENAME: src\app\modules\auth\register\contractor\components\paymentdetails\paymentdetails.component.ts
	AUTHOR: ICI/SS
	SUMMARY: HOLDS THE REGISTRATION FORM FOR PAYMENT DETAILS.
	PURPOSE: TO MAKE MULTIPLE COMPONENTS TO GET USE IN DIFFERENT PLACES AND STAY SEPARATE OF CONCERNS
	IMPORTING FILES: paymentdetails.component.html | contractorprofile.component.scss
	SUBSCRIBING FILES: register.module.ts
	LAST COMMIT DATE: November 28, 2023
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.scss']
})
export class PaymentdetailsComponent implements OnInit{

	// INPUT FOR COMPANY TYPE AND CURRENT STEP
	@Input() companyType: string = '';
	@Input() current: number = 0;

	// OUTPUT SHOWS CURRENT STEP FOR REGISTRATION FORM
	@Output() currentPage = new EventEmitter();

	@Output() isValid = new EventEmitter();

	// VARIABLE TO DECIDE WHETHER CARD OR BANK ACCOUNT FORM IS OPEN(0 FOR CARD, 1 FOR BANK ACCOUNT)
	public expandMode: number = 0;
	public cardForm: FormGroup | any;
	public bankAccountForm: FormGroup | any;
	public cardMask = "0000 0000 0000 0000";
	public cvvMask = "000";
	public expirationDateMask = "00/00"


	// LIST OF SVG LOGO FOR BANKS
	public svgs = [
		`<svg xmlns="http://www.w3.org/2000/svg" width="132" height="60" viewBox="0 0 132 60" fill="none"><g clip-path="url(#clip0_2896_13587)"><path fill-rule="evenodd" clip-rule="evenodd" d="M62.8081 38.8123C63.5005 37.7286 64.1176 36.7351 64.78 35.8018C64.973 35.6469 65.218 35.5714 65.4649 35.5912H74.7821C76.355 35.5912 76.6937 35.2374 76.7012 33.672V32.5356C76.7012 31.2561 76.3475 30.9024 75.0757 30.9024H67.5496C66.751 30.8716 65.965 30.693 65.2315 30.3756C64.7078 30.1266 64.2512 29.7564 63.899 29.2956C63.547 28.8349 63.3098 28.297 63.2069 27.7264C62.8757 26.3004 62.8757 24.8173 63.2069 23.3914C63.3874 22.5426 63.8387 21.7753 64.493 21.2052C65.1473 20.6352 65.969 20.293 66.8345 20.2305C67.7377 20.14 68.6558 20.1552 69.5665 20.1552H79.9976C79.5235 20.9077 79.0268 21.5701 78.6731 22.2925C78.5138 22.6626 78.2356 22.9687 77.8823 23.1622C77.5292 23.3559 77.1214 23.4259 76.7239 23.3613C73.9468 23.2935 71.162 23.3613 68.3849 23.3613C67.1657 23.3613 66.8345 23.7 66.8195 24.8665V26.1685C66.8195 27.1393 67.2184 27.5082 68.1817 27.5157H75.2863C75.7897 27.5175 76.2923 27.55 76.7915 27.6135C77.717 27.6691 78.5926 28.0513 79.2625 28.6923C79.9322 29.3332 80.3528 30.1911 80.4493 31.1131C80.6374 32.4663 80.6374 33.8391 80.4493 35.1922C80.1106 37.45 78.4624 38.7522 75.8734 38.7897C71.5309 38.865 67.2485 38.8123 62.8081 38.8123ZM87.8021 23.3236V27.5985H98.015V30.7444H87.8321V35.5611H97.8419C98.0207 35.5387 98.2022 35.5723 98.3612 35.6572C98.5202 35.7421 98.6489 35.8741 98.7299 36.0352C99.2719 36.9459 99.8513 37.8264 100.469 38.7973H84.0164V20.8251C84.0164 20.3433 84.0992 20.1327 84.6487 20.1327H99.8363C99.9868 20.1327 100.13 20.1327 100.408 20.1778C99.7385 21.2314 99.1289 22.2174 98.474 23.1882C98.3762 23.3236 98.045 23.3236 97.8193 23.3236H87.8021ZM23.6122 27.508H33.9982V20.7723C33.9982 20.3131 34.0961 20.1099 34.6078 20.125H37.6936V38.7897H33.9982V30.8196H23.6423V38.7897H19.9546V20.1852H23.6122V27.508ZM39.8611 38.8273C39.9965 38.5036 40.0868 38.2629 40.1998 38.037C42.9292 32.262 45.6586 26.4921 48.3881 20.727C48.4471 20.5323 48.5732 20.3649 48.7442 20.2546C48.9151 20.1444 49.1197 20.0983 49.3213 20.1249H51.9254C52.0525 20.1387 52.1749 20.1802 52.2841 20.2467C52.3934 20.313 52.4867 20.4024 52.5575 20.5087C55.4426 26.5296 58.3075 32.5506 61.1524 38.5714C61.1585 38.644 61.1585 38.7171 61.1524 38.7897H57.2237C57.1033 38.7897 56.9528 38.5338 56.8775 38.3757C56.4184 37.3897 55.9744 36.3963 55.5529 35.3653C55.5058 35.2087 55.4036 35.0745 55.2653 34.9873C55.127 34.9002 54.9619 34.866 54.8003 34.8912H46.1905C46.0288 34.8643 45.8629 34.8978 45.7241 34.9852C45.5854 35.0727 45.4835 35.2078 45.4379 35.3653C45.0164 36.3663 44.5799 37.3672 44.0983 38.3757C44.0369 38.4867 43.9519 38.5827 43.8491 38.6569C43.7462 38.731 43.6283 38.7816 43.5037 38.8047C42.3748 38.8498 41.1856 38.8273 39.8611 38.8273ZM53.9348 31.7677C52.8059 29.1712 51.677 26.65 50.5255 23.9782C49.3666 26.6652 48.2677 29.1864 47.1463 31.7677H53.9348ZM17.6591 38.8198C13.4897 38.8198 9.47073 38.8951 5.45181 38.8198C2.11776 38.737 0.0781905 36.562 0.0330341 33.2203C-0.0071051 30.7117 -0.0071051 28.203 0.0330341 25.6942C0.0781905 22.443 2.00486 20.2981 5.23355 20.1927C9.27506 20.0572 13.3166 20.14 17.3581 20.1325C17.4434 20.1516 17.5267 20.1793 17.6065 20.2153C16.9592 21.2389 16.3345 22.2549 15.6722 23.2257C15.5744 23.3688 15.2507 23.4064 15.0325 23.4139H6.49794C4.6691 23.4591 3.92402 24.1665 3.90896 26.0104V32.7838C3.90896 34.6353 4.66157 35.3955 6.54309 35.4105H14.6863C14.9529 35.3833 15.2212 35.4417 15.4525 35.577C15.6838 35.7121 15.8662 35.9175 15.9733 36.163C16.4699 37.021 17.0495 37.8565 17.6591 38.8198Z" fill="#211E1E"/><path fill-rule="evenodd" clip-rule="evenodd" d="M131.175 24.0459H116.401C115.784 24.0459 115.566 23.8879 115.589 23.2482C115.626 21.6451 115.589 20.0346 115.589 18.4315C115.589 17.5284 115.852 17.2498 116.733 17.2498H123.566C123.864 17.2464 124.153 17.3446 124.387 17.5284C126.592 19.5904 128.767 21.6676 130.957 23.7448C131.025 23.8276 131.085 23.9029 131.175 24.0459ZM125.29 40.7989V26.0028C125.29 25.363 125.485 25.1824 126.11 25.1974C127.691 25.2426 129.279 25.1974 130.867 25.1974C131.785 25.1974 132.003 25.4007 132.003 26.2887V33.2653C131.999 33.6058 131.88 33.9348 131.664 34.1986C129.693 36.3135 127.691 38.3982 125.696 40.4904C125.568 40.603 125.433 40.7061 125.29 40.7989ZM108.589 34.9588H123.235C124.093 34.9588 124.093 34.9588 124.093 35.8318V40.5207C124.093 41.371 123.807 41.6496 122.964 41.6571H115.995C115.721 41.6623 115.454 41.5689 115.242 41.3937C113.09 39.3766 110.953 37.3371 108.823 35.2975C108.736 35.1907 108.658 35.0775 108.589 34.9588ZM114.309 18.2283V32.8816C114.309 33.5364 114.129 33.7471 113.459 33.7245C111.856 33.6793 110.245 33.7245 108.642 33.7245C107.837 33.7245 107.604 33.4837 107.604 32.6634V25.6942C107.604 25.3975 107.701 25.1092 107.882 24.8739C109.884 22.7364 111.916 20.614 113.903 18.4917C114.032 18.3942 114.168 18.3061 114.309 18.2283Z" fill="#117ACA"/></g><defs><clipPath id="clip0_2896_13587"><rect width="132" height="60" fill="white" transform="translate(0.00292969)"/></clipPath></defs></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" width="132" height="60" viewBox="0 0 132 60" fill="none"><path d="M60.6958 33.4716C62.1523 34.0365 63.6088 34.642 65.0252 35.3274C60.4889 37.1416 56.105 39.3136 51.9152 41.8228C50.4988 41.0961 49.0423 40.3707 47.5858 39.7246C51.7936 37.3045 56.1638 35.2068 60.6958 33.4716ZM55.2733 31.5757C50.5832 33.0705 46.0447 35.0019 41.7178 37.3444C43.0934 37.8694 44.4691 38.3937 45.8047 38.9584C49.9783 36.4941 54.3826 34.4404 58.9553 32.8267C57.7414 32.3824 56.528 31.9389 55.2733 31.5757Z" fill="#2267AD"/><path d="M89.3424 40.4913C89.4232 40.7335 89.626 40.8144 89.8276 40.8144C89.9484 40.8144 90.0705 40.8144 90.1512 40.7336C90.2017 40.6782 90.2304 40.6063 90.232 40.5314C90.232 40.3698 90.1111 40.2891 89.9484 40.2891L89.6661 40.2082C89.5852 40.1676 89.4633 40.1676 89.3824 40.0869C89.3017 40.006 89.2617 39.8851 89.2617 39.7638C89.2617 39.4407 89.5452 39.3198 89.8276 39.3198C90.0705 39.3198 90.3127 39.4407 90.3936 39.7236L90.192 39.7638C90.192 39.6016 89.9892 39.4807 89.7876 39.4807C89.6667 39.4807 89.4639 39.5615 89.4639 39.723C89.4639 39.9253 89.586 39.9654 89.7474 40.006L89.9892 40.0461C90.1111 40.0861 90.232 40.1269 90.3127 40.167C90.3936 40.2885 90.4336 40.3698 90.4336 40.5314C90.4336 40.6523 90.3936 40.8144 90.2721 40.8951C90.1512 40.9765 89.9886 41.0166 89.8276 41.0166C89.5039 41.0166 89.3023 40.8545 89.1814 40.5314L89.3424 40.4913ZM90.9187 40.9765H90.7579V39.3598H91.0396L91.5667 40.6528L92.01 39.3598H92.3337V40.9765H92.1321V39.5614L91.6056 40.9765H91.444L90.9187 39.5614V40.9765ZM70.5078 33.2961C66.796 31.5222 62.9593 30.0225 59.0286 28.8088C57.6138 29.2126 56.2396 29.6572 54.9055 30.1023C58.9516 31.3182 62.8977 32.8452 66.7083 34.6698C67.9617 34.1845 69.2137 33.7405 70.5078 33.2961ZM76.5303 31.5172C72.771 29.86 68.85 28.4857 64.8484 27.3943C63.555 27.6367 62.3022 27.9197 61.0495 28.2428C65.0104 29.4155 68.8902 30.8706 72.6094 32.6493C73.9023 32.2449 75.2364 31.8409 76.5303 31.5172ZM86.2303 34.7511C76.7313 37.9449 67.839 42.5124 59.7961 48.2124C61.8171 49.4652 63.7572 50.7588 65.6566 52.1731C73.3093 46.1085 81.7542 41.1173 90.7573 37.3376C89.2798 36.4214 87.7699 35.5585 86.2303 34.7511ZM79.6825 31.6788C69.8197 34.266 60.5643 38.4702 52.1973 44.0482C54.0565 44.9779 55.9159 45.9485 57.7345 46.9991C65.9401 41.3397 75.0348 36.8931 84.7347 33.9823C83.0782 33.1746 81.4204 32.3662 79.6825 31.6788Z" fill="#CD2E29"/><path d="M52.5494 12.3667C54.9338 12.3667 56.1463 14.1448 56.1463 16.5287C56.1463 18.9938 54.9739 20.7312 52.5494 20.7312C50.0843 20.7312 48.9526 18.9938 48.9526 16.5287C48.9526 14.1448 50.165 12.3667 52.5494 12.3667ZM52.5494 19.1147C53.1961 19.1147 53.479 18.5489 53.479 16.5287C53.479 14.6699 53.2768 13.9833 52.5494 13.9833C51.8221 13.9833 51.6199 14.6699 51.6199 16.5287C51.6199 18.5489 51.9028 19.1147 52.5494 19.1147ZM57.8039 14.387H56.7529V12.6089H57.8039V11.7202C57.8039 9.74006 58.7741 9.01282 60.4712 9.01282C60.9563 9.01282 61.3601 9.09356 61.7645 9.13423V11.1144C61.6076 11.0648 61.4444 11.0377 61.28 11.0337C60.5933 11.0337 60.3503 11.3165 60.3503 11.801V12.6095H61.7645V14.3876H60.3503V20.5697H57.8039V14.387ZM27.7748 14.8313C27.7748 14.3463 27.5726 14.0234 27.1288 14.0234C26.4821 14.0234 26.2799 14.5891 26.2799 15.0735L24.0164 14.5885C24.2987 13.0533 25.7542 12.4068 27.209 12.4068C28.7446 12.4068 30.3614 13.0527 30.3614 14.8307V19.2755C30.3614 20.1642 30.4829 20.4471 30.6037 20.5685H27.9364C27.8963 20.3262 27.8557 19.962 27.8557 19.8413C27.4112 20.2856 26.6431 20.7306 25.9157 20.7306C24.6224 20.7306 23.6521 19.8413 23.6929 18.3867C23.7329 16.3259 26.0771 15.6794 27.7748 15.4778V14.8313ZM27.7748 16.7301C26.8859 16.811 26.1986 17.1746 26.1986 18.1847C26.1986 18.7505 26.4815 19.0332 26.9668 19.0332C27.2497 19.0332 27.5732 18.8312 27.7748 18.5483V16.7301ZM34.4435 14.8714V20.5691H31.8569V12.6089H34.3627L34.4033 13.4175C34.9693 12.8518 35.656 12.4074 36.6664 12.4074C37.7981 12.4074 38.4448 13.1747 38.4448 14.2662V20.5697H35.8582V15.0741C35.8582 14.6298 35.696 14.3876 35.2516 14.3876C34.9693 14.387 34.6858 14.5484 34.4435 14.8714ZM40.021 9.25504H42.6076V14.9928H42.6476L44.5475 12.6089H47.0933L44.9518 15.0335L47.0933 20.5691H44.426L43.1734 17.0937H43.1327L42.6076 17.7002V20.5691H40.021V9.25504ZM20.9447 14.6699C22.1573 15.0741 23.0462 16.0842 23.0462 17.5394C23.0462 19.4783 21.5107 20.5697 19.3279 20.5697H15.0029V9.25504H19.4486C21.4693 9.25504 22.7626 10.4673 22.7626 12.0025C22.7626 13.4977 21.7523 14.2656 20.9441 14.5885L20.9447 14.6699ZM17.7523 18.4682H18.8026C19.4492 18.4682 20.2574 18.1853 20.2574 17.0537C20.2574 16.2057 19.7323 15.6399 18.8026 15.6399H17.7523V18.4682ZM17.7523 13.7399H18.7219C19.7323 13.7399 20.1365 13.1741 20.1365 12.5276C20.1365 11.4367 19.4092 11.2753 18.7625 11.2753H17.7523V13.7399ZM113.941 14.8313C113.941 14.3463 113.698 14.0234 113.254 14.0234C112.647 14.0234 112.445 14.5891 112.405 15.0735L110.183 14.5885C110.465 13.0533 111.92 12.4068 113.376 12.4068C114.911 12.4068 116.527 13.0527 116.527 14.8307V19.2755C116.527 20.1642 116.648 20.4471 116.73 20.5685H114.102C114.062 20.3262 114.022 19.962 114.022 19.8413C113.577 20.2856 112.81 20.7306 112.041 20.7306C110.789 20.7306 109.778 19.8413 109.819 18.3867C109.9 16.3259 112.244 15.6794 113.941 15.4778V14.8313ZM113.941 16.7301C113.051 16.811 112.365 17.1746 112.365 18.1847C112.365 18.7505 112.647 19.0332 113.091 19.0332C113.415 19.0332 113.697 18.8312 113.94 18.5483L113.941 16.7301ZM87.4693 17.1345C87.428 17.8211 87.6308 19.0332 88.6811 19.0332C89.2871 19.0332 89.8123 18.5483 89.9332 17.9424L91.6715 18.5489C91.5506 18.9125 90.782 20.7312 88.4777 20.7312C86.012 20.7312 84.8809 18.7511 84.8809 16.5287C84.8809 14.2656 86.0941 12.3667 88.4371 12.3667C90.9028 12.3667 91.7917 14.5084 91.7917 16.6094V17.1345H87.4693ZM89.408 15.5987C89.408 14.8714 89.3272 13.9827 88.4377 13.9827C87.7109 13.9827 87.4274 14.8714 87.4687 15.5987H89.408ZM98.7044 12.6089H101.291V20.5691H98.7044V12.6089ZM98.7044 9.25504H101.291V11.5588H98.7044V9.25504ZM106.989 15.5586C106.989 15.2357 106.989 14.8313 106.868 14.5484C106.747 14.2249 106.544 13.9827 106.141 13.9827C105.292 13.9827 105.171 15.0329 105.171 16.6494C105.171 18.4275 105.453 19.0332 106.141 19.0332C107.029 19.0332 107.11 18.104 107.11 17.4981L109.131 17.781C108.929 19.7205 107.798 20.7306 105.938 20.7306C103.635 20.7306 102.422 18.7103 102.422 16.7301C102.422 14.5484 103.635 12.3667 106.059 12.3667C108.768 12.3667 109.212 14.7506 109.212 15.5586H106.989ZM66.2503 9.25504H70.0093L72.3943 20.5691H69.6457L69.2012 18.266H66.574L66.0487 20.5691H63.5836L66.2503 9.25504ZM66.9376 16.2858H68.7962L67.9886 11.6796H67.9067L66.9376 16.2858ZM92.8433 12.6089H95.3492V13.6597H95.3893C95.9144 12.8111 96.8848 12.4074 97.895 12.4074V14.9934C97.5715 14.872 97.2892 14.7913 96.8447 14.7913C96.1579 14.7913 95.7134 15.0335 95.4299 15.3977V20.5697H92.8433V12.6089ZM79.7891 14.8714V20.5691H77.2432V15.1142C77.2432 14.6699 77.1224 14.387 76.6373 14.387C76.3943 14.387 75.9913 14.5891 75.7885 14.8714V20.5691H73.2425V12.6089H75.7484L75.7885 13.4175C76.3543 12.8924 77.1631 12.4074 78.0926 12.4074C78.9002 12.4074 79.4254 12.8518 79.6688 13.4576H79.709C80.1535 12.9726 80.9209 12.4074 81.9731 12.4074C83.0642 12.4074 83.791 13.094 83.791 14.2255V20.5697H81.2452V15.1148C81.2452 14.6705 81.1243 14.3876 80.6392 14.3876C80.3149 14.387 79.9519 14.6699 79.7891 14.8714ZM117.781 19.6397C117.781 19.0332 118.265 18.5489 118.912 18.5489C119.201 18.5477 119.48 18.6623 119.685 18.8672C119.89 19.0719 120.004 19.35 120.003 19.6397C120.004 19.9293 119.89 20.2076 119.685 20.4123C119.48 20.6172 119.201 20.7317 118.912 20.7306C118.265 20.7312 117.781 20.2455 117.781 19.6397ZM117.982 19.6397C117.982 20.1242 118.387 20.4878 118.912 20.4878C119.397 20.4878 119.801 20.1242 119.801 19.6397C119.801 19.1547 119.397 18.7505 118.912 18.7505C118.387 18.7505 117.982 19.1547 117.982 19.6397Z" fill="#2267AD"/><path d="M119.447 20.2705H119.246L118.883 19.7044H118.681V20.2705H118.48V19.0575H119.044C119.124 19.0575 119.246 19.0575 119.326 19.0975C119.447 19.1784 119.487 19.2591 119.487 19.3806C119.487 19.623 119.286 19.7044 119.085 19.7044L119.447 20.2705ZM118.884 19.5429C119.045 19.5429 119.286 19.5829 119.286 19.3806C119.286 19.219 119.165 19.1784 119.004 19.1784H118.682V19.5421L118.884 19.5429Z" fill="#2267AD"/></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" width="132" height="60" viewBox="0 0 132 60" fill="none"><path d="M78.5852 23.1255C78.0448 24.1348 76.8574 24.3877 74.8414 24.3877H70.7009V12.8993C70.7009 11.4977 70.9903 11.3546 72.6448 11.3546L73.8698 11.3182V9.4099H63.6088V11.3182H64.5107C65.9524 11.3182 66.8147 11.4619 66.8147 12.9L66.8524 22.912C66.8524 24.3514 66.2009 24.4957 64.7279 24.4957H63.7558V26.4035H81.284V19.5517C81.284 19.5498 79.6187 19.5517 79.3039 19.5517C79.3039 21.2062 79.0892 22.2259 78.5852 23.1255ZM56.2081 24.3877H50.7352V18.4797H51.9949C54.1213 18.4797 54.4087 18.877 54.5518 21.7941H56.5325V13.1906H54.5894C54.4093 15.7453 54.1219 16.4673 51.9604 16.4673H50.7358V11.4261H55.4888C58.9451 11.4261 59.8798 12.0375 59.989 15.9978H61.9307V9.40927H36.676V11.3175H37.861C38.8325 11.3175 39.302 11.5335 39.302 12.0733C39.302 12.3608 39.302 12.7933 39.0848 13.3702L35.8112 21.9729C35.8112 21.9729 35.8048 21.9627 35.6062 21.9627C34.1126 17.6601 32.0674 12.7204 32.0674 12.7204C31.9706 12.4928 31.9214 12.2478 31.9231 12.0004C31.9231 11.4964 32.2475 11.3169 33.1099 11.3169H34.5515V9.40863H25.4428V11.3169H26.5951C28.07 11.3169 28.5389 12.0362 28.6826 13.4404L25.2991 21.9378C25.301 21.9378 25.2269 21.9403 25.0589 21.9129C23.4932 17.3125 21.5201 12.6495 21.5201 12.6495C21.4123 12.3972 21.4454 12.2164 21.4454 12.1084C21.4115 11.5686 21.8446 11.3162 22.8161 11.3162H23.6414V9.408H15.0029V11.3162H15.4001C16.6598 11.3162 17.5247 12.1448 18.0989 13.6212L23.1745 26.4007H26.3428L30.0515 16.9681L33.9395 26.4007H36.9967L41.8589 13.404C42.4339 11.8554 42.9014 11.3156 44.3054 11.3156H44.5814C46.0556 11.3156 46.8872 11.4594 46.8872 12.8635V22.9089C46.8872 24.313 46.0556 24.4555 44.5814 24.4555L43.574 24.4932V26.4007H62.2591V19.56H60.3146C60.049 22.9338 59.3023 24.3877 56.2081 24.3877ZM97.6171 19.5517C97.6171 21.207 97.4012 22.2265 96.8972 23.1261C96.3568 24.1354 95.1706 24.3885 93.1559 24.3885H89.0123V12.8993C89.0123 11.4977 89.303 11.3546 90.9574 11.3546L92.1812 11.3182V9.4099H81.9221V11.3182H83.0023C84.442 11.3182 85.1255 11.4619 85.1255 12.9L85.1618 22.912C85.1618 24.3514 84.5129 24.4957 83.0374 24.4957H82.7794V26.4035H99.598V19.5517C99.5986 19.5498 97.8982 19.5517 97.6171 19.5517ZM117.002 21.4338C117.002 25.3224 113.942 26.7273 109.405 26.7273C106.672 26.7273 104.043 25.1773 103.468 24.6402L102.891 26.4148H101.164V19.5702H103.146C103.683 22.8379 105.871 24.2491 108.997 24.3877C111.674 24.5098 113.587 23.7943 113.798 21.9384C114.043 19.7919 111.678 19.9216 109.694 19.5639L106.78 19.0221C102.425 18.265 101.022 17.0071 100.912 14.163C100.803 11.0658 103.611 9.05023 107.39 9.01318C109.227 9.01318 111.606 9.30066 113.442 10.7783L114.305 9.3735H115.817V15.309H113.908C113.488 12.0126 110.235 11.0083 107.463 11.0805C105.448 11.1521 104.117 12.3033 104.117 13.673C104.117 14.9468 105.379 15.1168 106.984 15.3978L110.547 16.0105C114.182 16.6225 117.003 17.3649 117.003 21.3985L117.002 21.4338ZM35.4803 41.4599C35.4803 40.1522 35.2651 39.0003 34.8001 38.0611C34.2212 37.0555 33.0338 36.9106 31.0192 36.9106H26.7715V41.9888H28.1032C30.2623 41.9888 30.5873 41.5908 30.5873 38.9632H32.1652V47.4606L30.5497 47.423C30.5146 44.5806 30.2272 44.0062 28.1026 44.0062H26.7707V48.431C26.7707 49.8371 26.9854 49.9809 28.4623 49.9809H30.4417V51.8872H19.966V49.9809L20.9383 49.9445C22.4125 49.9445 22.9178 49.802 22.9178 48.3959V38.3524C22.9178 36.9477 22.4119 36.8026 20.9383 36.8026H19.966V34.8963H37.424V41.4593L35.4803 41.4599ZM74.7602 47.0639H73.141C73.2133 49.0827 73.141 49.8378 72.0967 49.9086C71.594 49.945 71.1973 49.4768 71.1251 48.47C71.1251 48.1097 71.1628 47.6401 71.1251 47.423C70.9456 45.1185 70.5502 44.0389 67.5257 43.3189C70.7654 42.8857 72.6734 41.3761 72.6734 38.9293C72.6734 36.1907 70.6588 34.8969 66.3019 34.8969H54.6016V36.8032H56.0063C57.4831 36.8032 57.6983 36.9483 57.6983 38.353V48.3965C57.6983 49.6334 56.8999 49.9846 55.9295 49.9809H54.691C53.7559 49.9681 53.2142 49.6014 52.7198 48.3274L47.282 34.8969H43.1167L37.4266 48.3274C36.9259 49.5126 36.5291 49.9846 35.1973 49.9846H34.4219V51.8885H43.2802V49.9846H41.5166C40.6121 49.9846 40.1471 49.945 40.1471 49.4072C40.1471 49.1899 40.2193 48.9396 40.3636 48.615L41.2259 46.4889H47.8486L48.5711 48.4706C48.7135 48.7938 48.8215 49.0833 48.8215 49.3005C48.8215 49.8741 48.3539 49.9854 47.3816 49.9854H45.5446V51.8891H64.7899V49.9815H63.2428C61.766 49.9815 61.5514 49.8378 61.5514 48.4317V43.8613H63.2779C66.2309 43.8613 67.1315 44.4363 67.2364 47.2816L67.3111 49.2621C67.4183 51.6029 68.9278 52.2521 71.2694 52.2521C73.3205 52.2521 74.7602 51.0279 74.7602 47.9283H74.798C74.7973 47.6401 74.7973 47.3532 74.7602 47.0639ZM42.0557 44.4734L44.612 37.9576L47.2016 44.4734H42.0557ZM65.2594 41.9492L61.5508 41.9888V36.8403H65.1847C67.5973 36.8403 68.7502 37.4152 68.7502 39.397V39.4321C68.7508 41.1966 67.633 41.9492 65.2594 41.9492ZM89.9021 40.3405C89.0852 37.7916 87.3746 36.6045 84.5698 36.6045C81.7963 36.6045 79.6021 38.8731 79.6391 43.1949C79.6391 47.5845 81.4034 49.9629 84.5698 49.9987C86.8738 49.9987 88.9261 48.8469 88.9261 46.9003V45.9643C88.9261 44.8138 88.6381 44.8139 87.0175 44.8139H86.1692V42.8685H94.0637V44.8139H93.416C92.1908 44.8139 92.0113 44.7052 92.0113 46.1452V51.8322H90.6176L89.7169 50.43C88.1686 51.654 85.9367 52.2303 83.9591 52.2303C81.6187 52.2303 79.6385 51.4029 78.0544 49.8186C76.3975 48.1257 75.4259 45.8583 75.4604 43.1943C75.4604 40.5642 76.3253 38.4752 78.0167 36.7835C79.4935 35.3435 81.7259 34.5137 84.0274 34.5539C85.9361 34.5539 88.168 35.0566 89.432 36.388L90.293 34.6209H91.6517V40.3258L89.9021 40.3405ZM105.433 52.1856C99.7901 52.1856 95.4038 48.6603 95.4038 43.3055C95.4038 37.9825 99.7901 34.4951 105.399 34.4951C111.042 34.4951 115.321 37.9825 115.321 43.3407C115.322 48.661 111.043 52.1856 105.433 52.1856ZM111.127 43.3937C111.127 37.3321 107.034 36.5796 105.363 36.5796C102.055 36.5796 99.5384 38.9166 99.5384 43.3752C99.5384 47.8336 102.055 50.2064 105.363 50.2064C107.015 50.207 111.127 49.3969 111.127 43.3937Z" fill="#AC3A30"/></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" width="133" height="60" viewBox="0 0 133 60" fill="none"><path d="M23.8174 39.164L23.7338 39.246C22.394 40.6113 20.8426 41.3354 19.2454 41.3354C15.9112 41.3354 13.4898 38.8319 13.4898 35.3778C13.4898 31.9307 15.9112 29.4257 19.2454 29.4257C20.8426 29.4257 22.394 30.1511 23.7338 31.5191L23.8174 31.6032L25.9619 29.0081L25.9048 28.938C24.1223 26.8292 21.9812 25.8041 19.3498 25.8041C16.711 25.8041 14.2958 26.6931 12.5566 28.2954C10.6652 30.0326 9.66797 32.4803 9.66797 35.3786C9.66797 38.2775 10.6652 40.7313 12.5566 42.4677C14.2958 44.0781 16.7104 44.9612 19.3498 44.9612C21.9812 44.9612 24.1223 43.9361 25.9048 41.8265L25.9619 41.7611L23.8174 39.164ZM28.1294 44.6061H31.9189V26.103H28.1294V44.6061ZM46.7632 40.5837C45.7505 41.1993 44.8105 41.5098 43.9642 41.5098C42.74 41.5098 42.1859 40.8633 42.1859 39.4232V29.6042H46.0468V26.12H42.1859V20.3618L38.4725 22.3508V26.12H35.2687V29.6042H38.4725V40.0503C38.4725 42.894 40.1572 44.8379 42.6748 44.8911C44.3816 44.9241 45.4111 44.4149 46.036 44.0418L46.0744 44.0162L46.9855 40.4477L46.7632 40.5837ZM49.8995 44.6061H53.6924V26.103H49.8995V44.6061Z" fill="#1C4882"/><path d="M55.8647 22.8251C52.4012 17.9344 46.6498 15.0177 40.798 15.0177C34.9474 15.0177 29.194 17.9352 25.7365 22.8251L25.5586 23.0762H29.9209L29.9674 23.0238C32.9371 19.9721 36.8129 18.3563 40.798 18.3563C44.7829 18.3563 48.6568 19.9721 51.6311 23.0238L51.6817 23.0762H56.0393L55.8647 22.8251Z" fill="#CC2131"/><path d="M60.9071 30.4981L60.8559 30.5661V40.1374L60.893 40.1961C62.0871 42.0421 64.0328 43.1467 66.0998 43.1467C69.2957 43.1467 70.9161 40.4533 70.9161 35.1439C70.9161 30.3978 69.1218 27.6801 65.9934 27.6801C64.0955 27.6793 62.3841 28.6276 60.9071 30.4981ZM124.692 44.5381V44.6028H122.402C122.272 44.3401 117.604 34.4569 117.604 34.4569L114.12 39.342V44.6035H111.957V20.2969C112.146 20.1885 113.609 19.3494 114.12 19.0617V36.7105L115.302 34.8745C115.298 34.8807 120.605 27.1992 121.284 26.2198H123.652C123.148 26.8941 118.977 32.6358 118.977 32.6358C118.977 32.6358 124.151 43.4256 124.692 44.5381ZM81.5763 44.9895H80.6583C78.7955 44.8816 75.44 44.0169 75.44 39.2019C75.44 34.9245 78.9705 33.4063 82.2774 33.4063C83.9403 33.4063 85.5804 33.7882 86.7698 34.4569L87.1274 34.653V32.0148C87.1274 29.089 85.6989 27.6073 82.8735 27.6073C81.1319 27.6073 79.5599 28.0444 77.9508 28.9543C77.8061 28.6278 77.3063 27.5211 77.1683 27.2086C78.852 26.3188 80.9318 25.8225 83.0507 25.8225C87.2493 25.8225 89.2914 27.7401 89.2914 31.6915V44.6028H87.1274V41.9215L86.7078 42.387C85.2294 44.0149 83.5497 44.8735 81.5763 44.9895ZM66.7094 44.9895H65.8533C64.0638 44.8789 62.601 44.1018 61.2762 42.5688L60.8559 42.0778V44.6028H58.6973V20.2963C58.8798 20.1879 60.3488 19.3486 60.8559 19.0611V28.8964L61.2735 28.4377C62.8683 26.6779 64.631 25.8225 66.6588 25.8225C70.7168 25.8225 73.0464 29.2036 73.0464 35.1049C73.0457 40.9161 70.5713 44.7415 66.7094 44.9895ZM77.5589 39.0234C77.5589 41.7733 78.9834 43.2855 81.5709 43.2855C83.774 43.2855 85.7292 42.2449 87.0857 40.353L87.1274 40.2883V36.258L87.0062 36.1879C85.6248 35.4006 84.2138 35.082 82.134 35.082C79.2729 35.0827 77.5589 36.5563 77.5589 39.0234ZM96.3491 28.4095C97.4645 26.7426 99.2129 25.8225 101.26 25.8225C105.338 25.8225 107.5 28.4236 107.5 33.3463V44.6028H105.331V33.8124C105.331 29.6251 103.876 27.6793 100.728 27.6793C97.7115 27.6793 95.91 29.974 95.91 33.8124V44.6028H93.7487V26.2198H95.91V29.0695L96.3491 28.4095Z" fill="#1C4882"/></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" width="133" height="60" viewBox="0 0 133 60" fill="none"><path d="M84.702 38.4299C80.3588 41.5082 75.228 44.73 69.7155 48.119L69.5007 48.2384C69.4292 48.2861 69.4055 48.3818 69.453 48.477C69.5007 48.5486 69.5964 48.5721 69.6917 48.5247L69.8828 48.4291C74.5599 45.9949 79.9532 43.0835 85.3464 40.1004C85.3703 40.0763 85.3941 40.0763 85.4415 40.0527C85.1316 39.5516 84.8691 39.0027 84.702 38.4299ZM113.148 15.4004C106.323 7.85912 62.3892 14.6367 43.7039 18.7176L43.2743 18.813C43.1789 18.8369 43.1309 18.9086 43.1309 19.004C43.1549 19.0994 43.2263 19.1472 43.3218 19.1472L43.7516 19.0517C59.2154 16.3073 91.4078 12.4889 98.3522 19.362C100.476 21.462 99.9509 24.1587 97.517 27.3327C98.8295 28.1919 99.7841 29.5283 100.214 31.1988C109.759 24.827 116.178 18.7653 113.148 15.4004Z" fill="#D22F2F"/><path d="M87.4803 36.4513C87.5758 39.1002 89.2463 41.2716 91.4423 41.2716C95.6905 41.2716 97.4804 36.0693 97.3612 32.5855C97.2656 29.9367 95.5471 27.765 93.3755 27.765C89.6996 27.765 87.361 32.9434 87.4803 36.4513ZM85.2368 36.3082C85.0698 31.7742 88.6256 27.1684 93.781 27.1684C97.2175 27.1684 99.4847 29.4594 99.6041 32.9673C99.7711 37.74 96.4537 42.1071 91.06 42.1071C87.6235 42.1071 85.3562 39.8161 85.2368 36.3082ZM36.4783 35.115C36.2872 35.1865 36.0485 35.2584 35.7623 35.3059C35.476 35.3778 34.927 35.4729 34.1633 35.5923C33.6383 35.6877 33.2564 35.7832 33.0416 35.9502C32.8268 36.0936 32.7074 36.2844 32.6836 36.499C32.6359 36.7377 32.7074 36.9289 32.9222 37.0719C33.137 37.2147 33.4712 37.2865 33.9485 37.2865C34.3066 37.2865 34.6645 37.2388 35.0225 37.1196C35.3806 37.0002 35.6669 36.8568 35.9056 36.6661C36.0727 36.5229 36.1919 36.3322 36.2875 36.1173C36.3113 35.9502 36.3829 35.6161 36.4783 35.115ZM40.9652 32.323C40.9411 32.7286 40.8697 33.1107 40.7743 33.7309L40.0105 37.9786C39.9389 38.3607 40.0822 38.6467 40.4401 38.8615L40.4162 39.0286H36.0727L36.0248 37.9548C35.4044 38.3365 34.6406 38.6466 33.9485 38.8377C33.2567 39.0045 32.7074 39.1002 31.8722 39.1002C30.4643 39.1002 29.6767 38.9571 29.1275 38.4798C28.5548 37.9786 28.2923 37.6446 28.3162 36.9525C28.34 36.5469 28.5307 36.0457 28.8412 35.6877C29.1514 35.3298 29.5571 35.0911 29.9867 34.8763C30.44 34.6618 30.9653 34.5184 31.729 34.399C32.4926 34.2798 33.5666 34.1605 34.9987 34.0411C35.7385 33.9696 36.2158 33.8025 36.4306 33.7309C36.7409 33.6115 36.8363 33.4923 36.8839 33.2536C36.9557 32.8239 36.8363 32.5615 36.2396 32.4423C34.6883 32.1321 31.7528 32.6332 30.2492 33.015L31.0607 30.7954C33.0416 30.5094 34.927 30.3181 36.8839 30.3181C39.9866 30.2946 40.9891 31.1775 40.9652 32.323ZM53.5187 39.0286L55.0223 30.5332H59.1751L57.6714 39.0286H53.5187ZM55.261 28.5763C55.3804 27.8844 56.4784 27.3117 57.7195 27.3117C58.9603 27.3117 59.8433 27.8844 59.7239 28.5763C59.6047 29.2684 58.4829 29.8411 57.2657 29.8411C56.0247 29.8411 55.1179 29.2684 55.261 28.5763ZM73.9243 35.1388C73.7335 35.2105 73.4947 35.2821 73.2083 35.3298C72.922 35.4013 72.373 35.4969 71.5854 35.6161C71.0603 35.7114 70.6786 35.8071 70.4638 35.974C70.2728 36.1173 70.1534 36.3079 70.1057 36.5229C70.058 36.7615 70.1534 36.9525 70.3444 37.0954C70.5592 37.2388 70.8934 37.3102 71.3945 37.3102C71.7526 37.3102 72.1105 37.2625 72.4685 37.1431C72.8264 37.0239 73.1129 36.8806 73.3515 36.69C73.5183 36.5466 73.6376 36.3559 73.7094 36.1408C73.7573 35.974 73.8288 35.64 73.9243 35.1388ZM78.3872 32.3469C78.3633 32.7525 78.2918 33.1344 78.1726 33.7545L77.4326 38.0025C77.3611 38.3842 77.5043 38.6707 77.8622 38.8852L77.8384 39.0286H73.4947L73.4708 37.9548C72.8264 38.3365 72.0628 38.6466 71.3945 38.8377C70.7024 39.0286 70.1534 39.1002 69.3182 39.1002C67.91 39.1002 67.1225 38.9571 66.5735 38.4798C66.0008 37.9783 65.7382 37.6446 65.7622 36.9525C65.7862 36.5469 65.977 36.0457 66.2872 35.6877C66.5974 35.3298 67.0031 35.0911 67.4327 34.8763C67.8862 34.6618 68.4114 34.5184 69.1753 34.3752C69.9386 34.2559 71.0126 34.1365 72.4446 34.0173C73.1847 33.9457 73.6379 33.7786 73.8527 33.7071C74.1629 33.5877 74.2823 33.4684 74.33 33.2056C74.4017 32.7762 74.2585 32.5138 73.6856 32.3946C72.1105 32.0841 69.1988 32.5855 67.6952 32.967L68.5064 30.7477C70.5112 30.4614 72.3491 30.2704 74.3299 30.2704C77.4088 30.3184 78.4112 31.2013 78.3872 32.3469ZM27.7433 35.974C26.383 36.2365 25.6432 36.3559 24.3068 36.3559C22.3258 36.3559 20.7506 35.3775 20.8222 33.5638C20.8937 32.3707 22.3019 29.8173 25.9295 29.8173C27.0751 29.8173 27.9581 30.0082 29.1514 30.7002L29.6765 27.765C28.0535 27.1446 26.9797 27.0492 25.5715 27.073C20.8222 27.1207 16.2637 29.2684 15.7148 33.6594C15.142 38.1217 20.5835 39.2434 22.994 39.2196C24.3782 39.2196 25.8338 39.1479 27.1945 39.0286L27.7433 35.974ZM61.4661 30.4855L61.7525 28.7673L66.0962 27.8128L65.6428 30.4855H67.7669L67.3612 32.2036H65.3087L64.0676 39.0289C64.0676 39.0289 59.891 39.0048 59.8672 39.0289L61.1079 32.2278H59.5328L59.843 30.5095H61.466L61.4661 30.4855ZM82.6116 39.0286H78.3633L80.4872 27.1923L84.6161 27.3117L82.6116 39.0286ZM48.0296 32.5377C47.4806 32.5377 47.0033 32.7048 46.5499 33.0388C46.1203 33.373 45.8339 33.8502 45.7387 34.4947C45.6193 35.2345 45.691 35.7595 45.9773 36.0936C46.2637 36.4275 46.6933 36.5947 47.2658 36.5947C47.6479 36.5947 48.0296 36.5232 48.3159 36.3801C48.6739 36.1891 48.9127 35.9982 49.1274 35.6881C49.3661 35.3541 49.5092 34.9962 49.5806 34.5666C49.7 33.8985 49.6048 33.3973 49.2943 33.0633C48.9842 32.7048 48.5785 32.5377 48.0296 32.5377ZM40.4639 41.9638L42.4927 30.5809H46.1441L45.8577 32.0368C46.168 31.6071 46.669 31.2492 47.3849 30.963C48.077 30.6766 48.8887 30.4617 49.7477 30.4617C50.7023 30.4617 51.2752 30.5094 51.9911 30.8911C52.7071 31.2732 53.1844 31.7982 53.4706 32.5141C53.7335 33.2059 53.8052 33.9696 53.6619 34.8286C53.4233 36.2365 52.7312 37.3344 51.6092 38.1457C50.4872 38.9571 49.4854 39.1717 48.077 39.1717C47.5759 39.1717 47.1463 39.124 46.7882 39.0286C46.4543 38.9332 46.1678 38.8377 45.953 38.6946C45.7621 38.5513 45.5474 38.3842 45.2611 38.074L44.5928 41.9638H40.4639ZM115.833 33.5877C115.809 32.8957 115.475 32.442 114.759 32.442C113.064 32.442 111.251 35.7829 110.94 37.1196C113.709 37.1196 115.881 35.449 115.833 33.5877ZM116.191 38.8138L116.525 39.0286C115.69 40.7229 113.995 42.0831 112.015 42.0831C110.392 42.0831 109.055 41.0092 108.984 38.9809C108.864 35.3536 112.253 31.965 115.045 31.965C116.239 31.965 117.361 32.49 117.408 33.7789C117.503 36.6664 113.446 37.5493 110.773 37.6209C110.678 37.9311 110.654 38.2174 110.678 38.6947C110.726 39.888 111.442 40.9141 112.945 40.9141C114.234 40.8661 115.523 39.84 116.191 38.8138Z" fill="#004879"/><path d="M99.533 33.4926C99.8194 33.4449 100.297 33.3972 100.488 33.3972C100.798 33.3972 101.084 33.4449 101.084 33.7551C101.084 33.9464 100.774 35.2347 100.702 35.5211L100.058 38.3847C99.7952 39.5541 99.5092 40.7711 99.2705 41.7495H100.941L101.872 37.2395C104.736 34.2804 105.834 33.302 106.502 33.302C106.812 33.302 107.003 33.4691 107.027 33.827C107.051 34.3518 106.717 35.5449 106.597 35.8793L105.643 39.1725C105.428 39.9125 105.26 40.5804 105.284 41.0577C105.308 41.7737 105.762 42.1074 106.406 42.1074C107.623 42.1074 108.506 40.8428 109.27 39.6018L109.056 39.1961C108.745 39.6972 108.029 40.7948 107.457 40.7948C107.266 40.7948 107.099 40.6754 107.099 40.3652C107.075 39.9834 107.242 39.4106 107.361 39.0288L108.411 35.1629C108.698 34.089 108.841 33.4209 108.817 33.039C108.793 32.3231 108.364 31.9893 107.719 31.9893C106.621 31.9893 105.165 32.7768 102.086 36.3324H102.039L102.421 34.6143C102.635 33.6597 102.826 32.6811 103.041 32.0132C101.967 32.3952 100.464 32.8245 99.5092 33.0155L99.533 33.4926ZM117.674 30.3912C117.674 29.5295 118.368 28.9071 119.183 28.9071C119.997 28.9071 120.668 29.5295 120.668 30.3912C120.668 31.253 119.974 31.8753 119.183 31.8753C118.344 31.8753 117.674 31.253 117.674 30.3912ZM119.183 31.6359C119.853 31.6359 120.38 31.1093 120.38 30.3912C120.38 29.697 119.853 29.1704 119.183 29.1704C118.512 29.1704 117.985 29.697 117.985 30.3912C117.961 31.1093 118.488 31.6359 119.183 31.6359ZM118.847 31.253H118.584V29.5533H119.23C119.638 29.5533 119.829 29.697 119.829 30.0321C119.829 30.3434 119.638 30.4631 119.374 30.5109L119.854 31.253H119.566L119.111 30.5109H118.823V31.253H118.847ZM119.159 30.2955C119.374 30.2955 119.566 30.2715 119.566 30.0083C119.566 29.7927 119.374 29.7689 119.183 29.7689H118.823V30.2955H119.159Z" fill="#004879"/></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" width="133" height="60" viewBox="0 0 133 60" fill="none"><path d="M8.16797 15.003V38.2531L27.8406 44.9734L47.5595 38.2531V15.003H8.16797Z" fill="#BF4956"/><path d="M27.7988 37.5062H21.7658V35.432C20.5684 37.0908 18.8648 37.9664 16.4236 37.9664C13.5226 37.9664 10.7588 36.1697 10.7588 32.3898V21.143H17.0221V29.8079C17.0221 31.6523 17.2523 32.9882 19.0951 32.9882C20.1085 32.9882 21.5356 32.481 21.5356 29.8079V21.143H27.7988V37.5062ZM39.4504 25.937C39.358 25.3836 39.1739 25.0152 38.7134 24.7385C38.3446 24.3693 37.8379 24.1851 37.285 24.1851C36.5024 24.1851 35.4428 24.4163 35.4428 25.476C35.4428 25.9832 35.8111 26.2137 36.1799 26.3523C37.2388 26.8127 39.5876 26.9051 41.7061 27.6426C43.6861 28.2885 45.5282 29.4863 45.5282 32.16C45.5282 36.723 41.245 37.9677 37.2382 37.9677C33.3698 37.9677 29.179 36.4008 29.0411 32.16H34.9831C35.0753 32.7596 35.3057 33.2199 35.8117 33.6353C36.0881 33.8651 36.6872 34.0955 37.4698 34.0955C38.2529 34.0955 39.5882 33.8195 39.5882 32.8508C39.5882 31.8834 38.9899 31.6529 36.0881 31.1457C31.345 30.3164 29.41 28.7487 29.41 25.9832C29.41 21.8349 33.8773 20.7744 37.1471 20.7744C40.7389 20.7744 44.9759 21.7425 45.1145 25.937H39.4504Z" fill="white"/><path d="M49.739 15.0615H55.9559V22.942H56.0483C57.0155 21.6057 58.6735 20.7765 60.5155 20.7765C65.996 20.7765 67.5155 25.3842 67.5155 29.2566C67.5155 33.3573 65.2591 37.9656 60.6533 37.9656C57.6145 37.9656 56.6473 36.768 55.8181 35.7538H55.7719V37.5048H49.7383L49.739 15.0615ZM58.4887 25.3387C56.2778 25.3387 55.7719 27.4125 55.7719 29.3482C55.7719 31.2841 56.2786 33.4503 58.4887 33.4503C60.7451 33.4503 61.2518 31.2841 61.2518 29.3482C61.2518 27.4125 60.7457 25.3387 58.4887 25.3387ZM84.8777 33.8643C84.8777 35.155 84.9694 36.492 85.6133 37.5061H79.3046C79.1668 37.0908 79.0289 36.3996 79.0738 35.9394H79.0289C77.6929 37.5061 75.7585 37.9663 73.733 37.9663C70.6006 37.9663 68.0222 36.3996 68.0222 32.9889C68.0222 27.874 74.0557 28.012 77.2331 27.4131C78.0617 27.2752 78.9365 27.0447 78.9365 25.9843C78.9365 24.8785 77.9239 24.4177 76.8643 24.4177C74.9299 24.4177 74.5618 25.3849 74.5618 26.1231H68.7592C68.897 21.514 73.2719 20.7771 77.1413 20.7771C84.9694 20.7771 84.8783 24.003 84.8783 27.1827L84.8777 33.8643ZM78.9359 30.1789C78.1673 30.5635 77.3443 30.8277 76.4954 30.9619C75.0677 31.2841 74.3308 31.6531 74.3308 32.7597C74.3308 33.4972 75.1607 34.2333 76.2652 34.2333C77.6929 34.2333 78.7987 33.4503 78.9365 31.6993L78.9359 30.1789ZM87.134 21.1449H93.1207V23.2186H93.2123C94.4092 21.6057 96.0217 20.7765 98.555 20.7765C101.457 20.7765 104.127 22.5736 104.127 26.3065V37.5055H97.9105V28.9792C97.9105 27.0441 97.6796 25.7533 95.8837 25.7533C94.778 25.7533 93.3515 26.3059 93.3515 28.8874V37.5055H87.134V21.1449ZM106.384 15.0615H112.6V25.9381L116.561 21.1449H123.607L117.805 27.3207L124.482 37.5055H116.975L113.706 31.6525L112.6 32.8509V37.5055H106.384V15.0615ZM127.338 35.293C127.567 35.5242 127.613 35.8014 127.613 36.1698C127.613 36.492 127.567 36.768 127.338 36.9991C127.014 37.3213 126.785 37.3681 126.417 37.3681C126.14 37.3681 125.818 37.3219 125.633 36.9991C125.311 36.768 125.264 36.492 125.264 36.1698C125.264 35.8008 125.31 35.5234 125.633 35.293C125.864 35.0632 126.14 34.9252 126.417 34.9252C126.785 34.9252 127.014 35.0632 127.338 35.293ZM127.475 35.155C127.198 34.9252 126.785 34.786 126.417 34.786C126.049 34.786 125.68 34.9252 125.449 35.155C125.173 35.4324 125.035 35.8014 125.035 36.1698C125.035 36.5376 125.173 36.906 125.449 37.1371C125.68 37.4592 126.048 37.5972 126.417 37.5972C126.785 37.5972 127.199 37.4592 127.475 37.1371C127.706 36.906 127.844 36.5376 127.844 36.1698C127.842 35.7991 127.711 35.4408 127.475 35.155ZM126.647 36.1236H126.139V35.5704H126.37C126.508 35.5704 126.647 35.5704 126.739 35.662C126.785 35.662 126.785 35.7552 126.785 35.8932C126.785 35.9388 126.739 36.0306 126.647 36.1236ZM125.864 36.906H126.14V36.3526H126.37C126.508 36.3526 126.601 36.3526 126.647 36.399C126.739 36.399 126.785 36.537 126.785 36.7212V36.9054H127.107C127.014 36.9054 127.014 36.8604 127.014 36.8604V36.6294C127.014 36.5362 127.014 36.4914 126.97 36.3982C126.877 36.2602 126.785 36.2602 126.739 36.2602C126.785 36.1684 126.877 36.1684 126.97 36.1222C127.014 36.1222 127.107 35.938 127.107 35.8C127.107 35.6608 127.014 35.5228 126.785 35.431C126.739 35.431 126.601 35.3848 126.417 35.3848H125.864V36.906Z" fill="#325390"/></svg>`
	]
	public svgArr: SafeHtml[] = []

	constructor(
		private sanitizer: DomSanitizer,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void 
	{
		// MAKING SURE SVG IS NOT CONSIDERED UNSAFE
		this.svgArr = this.svgs.map(d => this.sanitizer.bypassSecurityTrustHtml(d));

			// INITIALIZING REACTIVE ENTITY PROFILE FORM
			this.cardForm = this.formBuilder.group
			  ({
				cardnumber: new FormControl('', { validators: [Validators.required, Validators.pattern('^\\d{16}$') ], updateOn: 'blur' }),
				expiration: new FormControl('', { validators: [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])([0-9]{2})$') ], updateOn: 'blur' }),
				cvv: new FormControl('', { validators: [Validators.required, Validators.pattern('^\\d{3}$') ], updateOn: 'blur' }),
			  });  
			  console.log('this.cardForm==>',this.cardForm);

			  this.bankAccountForm = this.formBuilder.group
			  ({
				fullname: new FormControl('', { validators: [Validators.required, Validators.pattern('^[A-Za-z]+$') ], updateOn: 'blur' }),
				email: new FormControl('',{validators:  [Validators.required, Validators.pattern('^\\w+(?:[\\.+\\-]\\w+)*@\\w+(?:[\\.-]\\w+)*(?:\\.\\w{2,})+$'), Validators.maxLength(75)], updateOn: 'blur'}),
				bankaccount: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z \']*$') ], updateOn: 'blur' }),
				
			  });  
			  console.log('this.bankAccountForm==>',this.bankAccountForm);
			  
	}

	/**
	 * @title TO CHANGE THE STEPPER TO NEXT
	 */
	public onNext ()
	{
		this.currentPage.emit(this.current + 1);
	}

	/**
	 * @title TO CHANGE THE STEPPER TO PREVIOUS
	 */
	public onBack ()
	{
		this.changePage(this.current - 1);
	}

	/**
	 * @title TO CHECK THE VALIDATION AND CHANGE THE STEPPER ACCORDING TO PARAM
	 *
	 * @description
	 *    * WE ARE EMITTING AN EMITTER THAT WILL TELL THE CURRENT PAGE NUMBER TO PARENT
	 *        * SHOULD WE MOVE NEXT OR BACK
	 *
	 * @param pageNumber number
	 */
	public changePage (pageNumber: number)
	{
		this.currentPage.emit(pageNumber);
	}
}
