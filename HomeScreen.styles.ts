import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#fff',
    },
    pagesList: {
        flexDirection: 'column',
    },
    pageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    titleDescColumn: {
        flex: 1,
        flexDirection: 'column',
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',

    },
    pageDescription: {
        fontSize: 14,
        color: '#fff',
    },
    pageStars: {
        fontSize: 14,
        color: '#fff',
    },
    refreshButton: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    refreshButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    sortModes: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
    },
    modeButton: {
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: 10,
        color: '#fff',
        padding: 2,
    },
    modeButtonSelected: {
        color: '#fff',
        backgroundColor: '#00f',
    },
    modeButtonText: {
        color: '#fff',
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 10,
    },
    menuLabel: {
        color: '#fff',
        marginRight: 8,
    },
    menuTrigger: {
        borderWidth: 1,
        borderColor: '#fff',
        padding: 4,
    },
    menuBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuBackdropTouchable: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    menuPanel: {
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#fff',
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
});
