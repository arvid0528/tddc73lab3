import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        borderRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#fff',
    },
    header: {
        padding: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    pagesList: {
        flexDirection: 'column',
    },
    pageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f6eee5',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    titleDescColumn: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 10,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',

    },
    pageDescription: {
        fontSize: 14,
        color: '#000',
    },
    pageRightColumn: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },
    pageCreatedAtColumn: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    pageStars: {
        fontSize: 14,
        color: '#000',
    },
    pageStarsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starsLanguageColumn: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    pageLanguage: {
        fontSize: 14,
        color: '#000',
    },
    pageLanguageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCell: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#000',
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        // borderWidth: 1,
        // borderColor: '#fff',
        height: 30,
    },
    refreshButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',

    },
    menuView: {
        flexDirection: 'row',  
        alignItems: 'center',
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#000',
    },
    footerItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    footerItemText: {
        color: '#fff',
    },
    
});
