import React from 'react';


/**
 * Reference: https://ko.reactjs.org/docs/error-boundaries.html
 * 
 * 
 * 자식 컴포넌트에서 발생한 '렌더에 영향을 끼치는' 에러를 캐치하여 처리한다.
 * 자식컴포넌트가 아닌 곳에서 발생한 에러는 캐치하지 않는다.
 * 
 * 
 * EX 1. 에러 바운더리가 에러를 캐치하는 예
 * 
 * <ErrorBoundary>
 *      <CustomChildComponent />
 * </ErrorBoundary>
 * 
 * 
 * EX 2. 에러 바운더리가 에러를 캐치하지 못하는 예
 * 
 * <ErrorBoundary>
 *      <div>
 *          {a!.someString} << a is null or undefined
 *      </div>
 * </ErrorBoundary>
 * 
 */

type Props = any;
type State = {error: string | null};

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {error: null};
    }
  
    static getDerivedStateFromError(error: Error): State {
        // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
        return { error: `${error.name}: ${error.message}` };
    }

    componentDidCatch(error: Error) {
        // 에러 리포팅 서비스에 에러를 기록할 수 있습니다.
        // logErrorToMyService(error, errorInfo);
        console.error(error);
    }
  
    render() {
        const {error} = this.state;

        if (error) {
            // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
            return (
                <div>{error}</div>
            );
        } else {
            return <>{this.props.children}</>;
        }
    }
}