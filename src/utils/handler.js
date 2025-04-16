import NetInfo from '@react-native-community/netinfo';

const checkInternetConnection = async () => {
    try {
        const state = await NetInfo.fetch();
        return state.isConnected;
    } catch (error) {
        console.error('Error checking internet connection:', error);
        return false;
    }
};



export { checkInternetConnection };