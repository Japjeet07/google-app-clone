import React from 'react';
import googleWhiteLogo from '../../assets/google-white-logo.png'; // Adjust the path as necessary

interface UserPopupProps {
    user: { name: string; email: string; picture: string } | null;
    onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ user, onClose }) => {
    return (
        <div className="p-4 bg-zinc-700 h-full rounded-t-3xl">
            {/* Close Button */}
            <span
                className="material-symbols-outlined absolute top-4 left-4
                 text-zinc-300 text-2xl cursor-pointer"
                onClick={onClose}
            >
                close
            </span>

            {/* Google Logo */}
            <div className="flex justify-center bg-no-repeat bg-contain">
                <img
                    src={googleWhiteLogo}
                    className="w-20 h-8"
                />
            </div>


            {/* Google Account Section */}
            <div className="mt-4 bg-zinc-800 text-white rounded-t-3xl p-4">
                <div className="flex items-center ">

                    <img
                        src={user?.picture} // Replace with a default avatar if no picture
                        alt="User Avatar"
                        className="w-11 h-11 rounded-full"
                    />
                    <div className="ml-2">
                        <p className="text-sm font-medium text-zinc-300">{user?.name || 'Guest'}</p>
                        <p className="text-xs text-zinc-400">{user?.email || 'No email provided'}</p>
                    </div>
                </div>

                <div className="mt-4 mb-1 border-[0.5px] border-zinc-200 font-bold 
                rounded-lg mr-20 ml-[48px] py-1 text-center text-zinc-300 text-sm">
                    Google Account
                </div>
            </div>

            {/* History Section */}
            <div className="mt-[0.05cm] bg-zinc-800 text-white p-4 flex flex-col ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300
                         mr-4 ml-2 text-ls">
                            history
                         </span>
                        <p className="text-sm font-normal text-zinc-300">Search history</p>
                    </div>
                    <p className="text-xs font-bold text-zinc-400">Saving</p>
                </div>

                {/* White Line */}
                <div className="border-t-2 border-zinc-700 mt-2  ml-12 w-[88%] -mr-4"></div>
                {/* Delete Last 15 Minutes */}
                <p className="text-sm font-normal text-zinc-300 mt-3 ml-12">
                    Delete last 15 minutes
                </p>
            </div>

            <div className="mt-[0.05cm] bg-zinc-800 text-white p-4 flex flex-col rounded-b-3xl ">
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300 mr-4 ml-2 text-ls">
                            nearby
                        </span>
                        <p className="text-sm font-normal text-zinc-300">Search personalization</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300 mr-4 ml-2 text-ls">
                            handshake
                        </span>
                        <p className="text-sm font-normal text-zinc-300">SafeSearch</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300 mr-4 ml-2 text-ls">
                            data_loss_prevention
                        </span>
                        <p className="text-sm font-normal text-zinc-300">Results about you</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300 mr-4 ml-2 text-ls">
                            task_alt
                        </span>
                        <p className="text-sm font-normal text-zinc-300">Tasks</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300 mr-4 ml-2 text-ls">
                            bookmarks
                        </span>
                        <p className="text-sm font-normal text-zinc-300">Saves & collections</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300 mr-4 ml-2 text-ls">
                            account_circle
                        </span>
                        <p className="text-sm font-normal text-zinc-300">Your profle</p>
                    </div>
                </div>

            </div>


            <div className="mt-[0.05cm] text-white p-2 flex flex-col ">
                <div className="flex flex-col justify-between space-y-4">
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300 mr-4 ml-4 text-ls">
                            settings
                        </span>
                        <p className="text-sm font-normal text-zinc-300">Settings</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-symbols-outlined text-zinc-300 mr-4 ml-4 text-ls">
                            help
                        </span>
                        <p className="text-sm font-normal text-zinc-300">Help & feedback</p>
                    </div>
                </div>


            </div>


            {/* Privacy Policy and Terms of Service */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center items-center text-zinc-200 text-xs py-4 bg-zinc-700">
                <span>Privacy Policy</span>
                <span className="mx-6">•</span>
                <span>Terms of Service</span>
            </div>
        </div>
    );
};

export default UserPopup;