import { useEffect, useReducer } from "react";

type UsePaginationProps = {
  initialPage?: number;
  totalItems: number;
};

type PaginationState = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
};

export enum PaginationActionsTypes {
  CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE",
  INCREASE_CURRENT_PAGE = "INCREASE_CURRENT_PAGE",
  DECREASE_CURRENT_PAGE = "DECREASE_CURRENT_PAGE",
  UPDATE_TOTAL_PAGES = "UPDATE_TOTAL_PAGES",
}

type PaginationActions =
  | {
      type: PaginationActionsTypes.CHANGE_CURRENT_PAGE | PaginationActionsTypes.UPDATE_TOTAL_PAGES;
      payload: number;
    }
  | {
      type:
        | PaginationActionsTypes.INCREASE_CURRENT_PAGE
        | PaginationActionsTypes.DECREASE_CURRENT_PAGE;
    };

const reducer = (state: PaginationState, action: PaginationActions) => {
  switch (action.type) {
    case PaginationActionsTypes.CHANGE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case PaginationActionsTypes.INCREASE_CURRENT_PAGE: {
      const newPage = state.currentPage + 1;

      if (newPage >= state.totalPages) {
        return state;
      }

      return { ...state, currentPage: newPage };
    }
    case PaginationActionsTypes.DECREASE_CURRENT_PAGE: {
      const newPage = state.currentPage - 1;

      if (newPage < 1) {
        return state;
      }

      return { ...state, currentPage: newPage };
    }
    case PaginationActionsTypes.UPDATE_TOTAL_PAGES: {
      if (action.payload < state.currentPage) {
        return { ...state, totalPages: action.payload, currentPage: Math.max(action.payload, 1) };
      }

      return { ...state, totalPages: action.payload };
    }
  }
};

export const usePagination = ({ initialPage = 1, totalItems }: UsePaginationProps) => {
  const [state, dispatch] = useReducer(reducer, {
    currentPage: initialPage,
    totalPages: Math.ceil(totalItems / 5),
    pageSize: 5,
  });

  useEffect(() => {
    dispatch({
      type: PaginationActionsTypes.UPDATE_TOTAL_PAGES,
      payload: Math.ceil(totalItems / 5),
    });
  }, [totalItems]);

  return { pagination: state, changePagination: dispatch };
};
