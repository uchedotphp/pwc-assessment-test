export default {
    data() {
        return {
            rules: {
                required: (val: string) => val.length > 0,
                requiredLength: (val: string) => val.length >= 3,
                isEmail: (val: string) => {
                    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,7})+$/;
                    return emailRegex.test(val);
                },
                password: (val: string) => {
                    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                    return passwordRegex.test(val)
                }
            },
        };
    },
};
