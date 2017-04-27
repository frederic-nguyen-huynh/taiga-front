import * as Immutable from "immutable"

export const kanbanInitialState = {
    userstories: [],
    zoomLevel: 4,
    AppliedFilters: {},
    filtersData: null,
    folds: {},
    archiveVisible: {},
    addTask: null,
    "current-userstory": null,
    "creation-state": null,
    "bulk-create-state": null,
}

export const kanbanReducer = (state, action) => {
    switch(action.type){
        case 'SET_KANBAN_USER_STORIES':
            return state.set('userstories', action.payload);
        case 'SET_KANBAN_FILTERS_DATA':
            return state.set('filtersData', action.payload);
        case 'SET_KANBAN_APPLIED_FILTERS':
            return state.set('appliedFilters', action.payload);
        case 'ADD_KANBAN_FILTER':
            return state.updateIn(['appliedFilters', action.payload.category], (category) => {
                if (category === null) {
                    return Immutable.List(action.payload.filter)
                }
                return category.push(action.payload.filter)
            });
        case 'REMOVE_KANBAN_FILTER':
            return state.updateIn(['appliedFilters', action.payload.category], (category) => {
                if (category === null) {
                    return null;
                } else if (category.includes(action.payload.filter)) {
                    return category.filter((v) => v != action.payload.filter);
                }
                return category
            });
        case 'SET_KANBAN_ZOOM':
            return state.set('zoomLevel', action.payload);
        case 'SET_BULK_CREATE_LIGHTBOX_DATA':
            return state.set('bulk-create-state', action.payload);
        case 'SET_NEW_US_LIGHTBOX_DATA':
            return state.set('current-us', action.payload.us)
                        .set('creation-state', action.payload.statusId);
        case 'CLEAN_KANBAN_DATA':
            return Immutable.fromJS(kanbanInitialState);
        default:
            return state;
    }
};
