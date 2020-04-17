import { render } from '@testing-library/react';
import React from 'react';
import StandingList from './standing.list';

////////////////
// TEST SUITE //
////////////////

describe('Standing List Component', () => {

    it('should create', () => {
        let component = render(<StandingList items={[]} onItemClicked={() => { }} />);
        expect(component).toBeTruthy();
    });

    // Todo => test with items
});