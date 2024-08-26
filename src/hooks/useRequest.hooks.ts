import {Reducer, useCallback, useEffect, useReducer, useRef} from "react";


export type DataReducer<Data> = Reducer<
  DataReducerState<Data>,
  DataReducerAction<Data>
>;

interface DataReducerState<Data> {
  data: Data;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}

type DataReducerAction<Data> =
  | {
  type: "fetch/pending";
}
  | {
  type: "fetch/fulfilled";
  payload: Data;
}
  | {
  type: "fetch/rejected";
};

function dataReducer<Data>(
  state: DataReducerState<Data>,
  action: DataReducerAction<Data>
): DataReducerState<Data> {
  switch (action.type) {
    case "fetch/pending":
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case "fetch/fulfilled":
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        isSuccess: true,
        isError: false,
      };
    case "fetch/rejected":
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
    default:
      throw new Error();
  }
}

export function useRequest<DataModel_DTO, RequestArgs>(
  request: (...args: RequestArgs[]) => Promise<Response>,
  initialState: Partial<DataReducerState<DataModel_DTO>> & {data: DataModel_DTO}
) {
  const [state, dispatch] = useReducer<DataReducer<DataModel_DTO>>(
    dataReducer,
    {
      isFetching: false,
      isSuccess: false,
      isError: false,
      ...initialState,
    }
  );

  const isMountedRef = useRef(false);

  const fetch = useCallback(
    async (...args: RequestArgs[]) => {
      dispatch({ type: "fetch/pending" });

      const response = await request(...args)

      if (response.ok && isMountedRef.current) {
        const data = await response.json();

        dispatch({
          type: "fetch/fulfilled",
          payload: data,
        });
      }
      if (!response.ok && isMountedRef.current) {
         dispatch({
           type: "fetch/rejected",
         });
      }
    },
    [request]
  );

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    state,
    fetch,
  };
}
