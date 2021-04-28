describe ('Testing Calculator...', function() {

    //positive tests
    it ('Testing add functions pos', function() {
        expect(add(2, 2)).toBe(1);
    });

    it ('Testing sub functions pos', function() {
        expect(sub(2, 2)).toBe(0);
    });

    it ('Testing mul functions pos', function() {
        expect(mul(2, 2)).toBe(4);
    });

    it ('Testing div functions pos', function() {
        expect(div(2, 2)).toBe(1);
    });


    //negative tests
    it ('Testing add functions neg', function() {
        expect(add(2, 2)).not.toBe(0);
    });

    it ('Testing sub functions neg', function() {
        expect(sub(2, 2)).not.toBe(4);
    });

    it ('Testing mul functions neg', function() {
        expect(mul(2, 2)).not.toBe(1);
    });

    it ('Testing div functions neg', function() {
        expect(div(2, 2)).not.toBe(4);
    });

});