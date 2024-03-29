import React from "react";
import { Avatar } from "antd";

function EmpHero() {
    return (
        <div className="employee_dashboard_hero">
            <div className="emp_hero_container_main">
                <Avatar
                    className="emp_hero_dp"
                    size={168}
                    src={
                        <img
                            src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.webp?b=1&s=170667a&w=0&k=20&c=TXCiY7rYEvIBd6ibj2bE-VbJu0rRGy3MlHwxt2LHt9w="
                            alt="avatar"
                        />
                    }
                />
                <div className="emp_hero_name_container">
                    <h1>Hello,</h1>
                    <h2>Esther Howard</h2>
                    <h4>Photographer</h4>
                </div>
                <div className="emp_hero_edit_btn_container">
                    <button className="emp_hero_edit_btn">
                        edit
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                        >
                            <path
                                d="M10.037 3.88408L11.2076 5.05461M10.7895 2.85288L7.62296 6.01946C7.45934 6.18285 7.34775 6.39102 7.30226 6.61773L7.00977 8.08186L8.4739 7.78882C8.7006 7.74348 8.9085 7.63234 9.07217 7.46867L12.2388 4.30209C12.3339 4.20693 12.4094 4.09396 12.4609 3.96963C12.5124 3.84531 12.5389 3.71205 12.5389 3.57748C12.5389 3.44291 12.5124 3.30966 12.4609 3.18533C12.4094 3.061 12.3339 2.94803 12.2388 2.85288C12.1436 2.75772 12.0306 2.68224 11.9063 2.63074C11.782 2.57924 11.6487 2.55273 11.5141 2.55273C11.3796 2.55273 11.2463 2.57924 11.122 2.63074C10.9977 2.68224 10.8847 2.75772 10.7895 2.85288Z"
                                stroke="white"
                                stroke-width="1.10585"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M11.4345 9.18792V10.8467C11.4345 11.14 11.318 11.4212 11.1106 11.6286C10.9032 11.836 10.6219 11.9525 10.3286 11.9525H4.24647C3.95318 11.9525 3.67191 11.836 3.46452 11.6286C3.25713 11.4212 3.14063 11.14 3.14062 10.8467V4.76454C3.14062 4.47125 3.25713 4.18997 3.46452 3.98259C3.67191 3.7752 3.95318 3.65869 4.24647 3.65869H5.90524"
                                stroke="white"
                                stroke-width="1.10585"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <div className="emp_hero_notification_container">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="28"
                        viewBox="0 0 23 24"
                        fill="none"
                    >
                        <path
                            d="M2.8125 8.20019L10.2099 13.1318C10.8397 13.5517 11.6603 13.5517 12.2901 13.1318L19.6875 8.20019M4.6875 18.5127H17.8125C18.848 18.5127 19.6875 17.6732 19.6875 16.6377V7.2627C19.6875 6.22716 18.848 5.3877 17.8125 5.3877H4.6875C3.65197 5.3877 2.8125 6.22716 2.8125 7.26269V16.6377C2.8125 17.6732 3.65197 18.5127 4.6875 18.5127Z"
                            stroke="#3F3F46"
                            stroke-width="1.08"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 23 23"
                        fill="none"
                    >
                        <path
                            d="M14.0625 15.9375H18.75L17.4329 14.6204C17.0757 14.2632 16.875 13.7787 16.875 13.2735V10.3125C16.875 7.86334 15.3097 5.77977 13.125 5.00758V4.6875C13.125 3.65197 12.2855 2.8125 11.25 2.8125C10.2145 2.8125 9.375 3.65197 9.375 4.6875V5.00758C7.19026 5.77977 5.625 7.86334 5.625 10.3125V13.2735C5.625 13.7787 5.42433 14.2632 5.06712 14.6204L3.75 15.9375H8.4375M14.0625 15.9375V16.875C14.0625 18.4283 12.8033 19.6875 11.25 19.6875C9.6967 19.6875 8.4375 18.4283 8.4375 16.875V15.9375M14.0625 15.9375H8.4375"
                            stroke="#3F3F46"
                            stroke-width="1.08"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <Avatar
                        size={40}
                        src={
                            <img
                                src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.webp?b=1&s=170667a&w=0&k=20&c=TXCiY7rYEvIBd6ibj2bE-VbJu0rRGy3MlHwxt2LHt9w="
                                alt="avatar"
                            />
                        }
                    />
                </div>
                <div className="emp_hero_realtime_insights_container center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 69 69"
                        fill="none"
                    >
                        <path
                            d="M34.5 53.3182C29.5091 53.3182 24.7226 51.3356 21.1935 47.8065C17.6644 44.2774 15.6818 39.4909 15.6818 34.5C15.6818 29.5091 17.6644 24.7226 21.1935 21.1935C24.7226 17.6644 29.5091 15.6818 34.5 15.6818C39.4909 15.6818 44.2774 17.6644 47.8065 21.1935C51.3356 24.7226 53.3182 29.5091 53.3182 34.5C53.3182 39.4909 51.3356 44.2774 47.8065 47.8065C44.2774 51.3356 39.4909 53.3182 34.5 53.3182ZM34.5 47.0455C37.8273 47.0455 41.0182 45.7237 43.371 43.371C45.7237 41.0182 47.0455 37.8273 47.0455 34.5C47.0455 31.1727 45.7237 27.9818 43.371 25.629C41.0182 23.2763 37.8273 21.9545 34.5 21.9545C31.1727 21.9545 27.9818 23.2763 25.629 25.629C23.2763 27.9818 21.9545 31.1727 21.9545 34.5C21.9545 37.8273 23.2763 41.0182 25.629 43.371C27.9818 45.7237 31.1727 47.0455 34.5 47.0455ZM31.3636 0H37.6364V9.40909H31.3636V0ZM31.3636 59.5909H37.6364V69H31.3636V59.5909ZM7.88796 12.3228L12.3228 7.88796L18.975 14.5402L14.5402 18.975L7.88796 12.3228ZM50.025 54.4598L54.4598 50.025L61.112 56.6772L56.6772 61.112L50.025 54.4598ZM56.6772 7.88482L61.112 12.3228L54.4598 18.975L50.025 14.5402L56.6772 7.88796V7.88482ZM14.5402 50.025L18.975 54.4598L12.3228 61.112L7.88796 56.6772L14.5402 50.025ZM69 31.3636V37.6364H59.5909V31.3636H69ZM9.40909 31.3636V37.6364H0V31.3636H9.40909Z"
                            fill="#FFD600"
                        />
                    </svg>
                    <div className="emp_hero_date_container">
                        <h1>8:06:07 AM</h1>
                        <h2>Realtime Insight</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpHero;
