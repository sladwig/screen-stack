import React, { useState } from 'react';

const screenWidth = 300;
const time = 500;
function Abc() {
    const style = {
        background: 'red',
        height: 500,
        width: screenWidth,
        flexShrink: 0,
    };
    return <div style={style}>Abc</div>;
}
function Def() {
    const style = {
        background: 'green',
        height: 500,
        width: screenWidth,
        flexShrink: 0,
    };
    return <div style={style}>Def</div>;
}

function Xyz() {
    const style = {
        background: 'yellow',
        height: 500,
        width: screenWidth,
        flexShrink: 0,
    };
    return <div style={style}>Xyz</div>;
}

function getScreen(type) {
    return {
        abc: Abc,
        def: Def,
        xyz: Xyz,
    }[type];
}

export function ScreenStack() {
    const [stack, setStack] = useState(['abc', 'def', 'xyz']);
    const [viewIndex, setIndex] = useState(stack.length - 1);

    const stackStyle = {
        position: 'absolute',
        top: 20,
        left: 30,
        height: 520,
        width: screenWidth,
        overflow: 'hidden',
        background: 'blue',
    };
    const style = {
        position: 'absolute',
        display: 'flex',
        left: -viewIndex * screenWidth,
        flex: 1,
        background: 'blue',
        transition: `left ${time}ms ease`,
    };
    // setStack(['abc', 'def']);

    const push = newScreen => {
        const newStack = stack.slice();
        newStack.push(newScreen);
        console.log(newStack);
        setStack(newStack);
        setIndex(viewIndex + 1);
    };
    const pop = () => {
        const newStack = stack.slice();
        if (stack.length < 2) return;
        newStack.pop();
        setIndex(Math.max(viewIndex - 1, 0));
        setTimeout(() => setStack(newStack), time);
    };
    const setReturnScreen = returnScreen => {
        const newStack = stack.slice();
        if (newStack.length - 2 < 1) return;
        newStack[newStack.length - 2] = returnScreen;
        setStack(newStack);
    };

    return (
        <>
            <div style={stackStyle}>
                <div style={style}>
                    {stack.map(type => {
                        const Screen = getScreen(type);
                        return <Screen />;
                    })}
                </div>
            </div>
            <div>
                <div>
                    stack {stack} {viewIndex}
                </div>
                <div onClick={() => push('abc')}>push 'Abc'</div>
                <div onClick={() => push('def')}>push 'Def'</div>
                <div onClick={() => push('xyz')}>push 'Xyz'</div>
                <div onClick={() => setReturnScreen('abc')}>setReturnScreen 'Abc'</div>
                <div onClick={() => setReturnScreen('def')}>setReturnScreen 'Def'</div>
                <div onClick={() => setReturnScreen('xyz')}>setReturnScreen 'Xyz'</div>

                <div onClick={() => pop()}>pop</div>
            </div>
        </>
    );
    // return <>'ABX'</>;
}
