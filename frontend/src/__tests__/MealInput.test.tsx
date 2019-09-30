import { ReactWrapper, mount } from "enzyme";
import React from 'react';
import MealInput from "../components/meal-input/MealInput";
import { TextField, Button, InputLabel } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import { ButtonProps } from "@material-ui/core/Button";

jest.mock('react-i18next', () => ({
    withTranslation: () => (comp: React.ComponentType<any>) => {
      comp.defaultProps = { ...comp.defaultProps, t: (s: string) => s };
      return comp;
    }
}));

describe('MealInput component', () => {

    let root: ReactWrapper;
    function inputValueAndCheck(str: string) {
        const inputWrapper: ReactWrapper = root.find(TextField);
        const inputEl = inputWrapper.find('input');
        const input: HTMLInputElement = inputEl.getDOMNode();
        const eventObj = {target: {value: str}};
        inputEl.simulate('change', eventObj);
        expect(input.value).toEqual(str);
    }

    let changeFn = jest.fn();
    beforeEach(() => {
        changeFn = jest.fn();
        root = mount(<MealInput onChange={changeFn} loading={false} />);
    });

    test('input valid value',  (dn) => {

        const food: string = 'Pizza';
        let inputWrapper: ReactWrapper = root.find(TextField);
        const inputEl = inputWrapper.find('input');
        let input: HTMLInputElement = inputEl.getDOMNode();
        expect(input.value).toEqual("");
        inputValueAndCheck(food);
        setTimeout(() => {
            root = root.update();
            input = inputEl.getDOMNode();
            inputWrapper = root.find(TextField);
            expect((inputWrapper.props() as TextFieldProps).error).toBeFalsy();
            const buttonWrapper: ReactWrapper = root.find(Button);
            buttonWrapper.find('button').simulate('click');
            setTimeout(() => {
                expect(changeFn).toHaveBeenCalled();
                expect(changeFn.mock.calls[0][0]).toEqual(food);
                dn();
            });
        });
    });

    test('input short value',  (dn) => {
        const food: string = 'Or';
        let inputWrapper: ReactWrapper = root.find(TextField);
        inputValueAndCheck(food);
        setTimeout(() => {
            root = root.update();
            inputWrapper = root.find(TextField);
            expect((inputWrapper.props() as TextFieldProps).error).toBeTruthy();
            const buttonWrapper: ReactWrapper = root.find(Button);
            expect((buttonWrapper.props() as ButtonProps).disabled).toBeTruthy();
            expect(root.find(InputLabel).at(0)).toBeTruthy();
            dn();
        });
    });

    test('loading state',  () => {
        root.setProps({
            loading: true
        });
        const buttonWrapper: ReactWrapper = root.find(Button);
        expect((buttonWrapper.props() as ButtonProps).disabled).toBeTruthy();
    });
});
