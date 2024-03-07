import 'cypress-file-upload';

const api_url =
  'https://ae0e-2405-9800-b660-6b84-48c4-d851-4a21-9f0d.ngrok-free.app';
describe('TESTS', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('UI TESTS', () => {
    describe.skip('VISIT PAGE TEST', () => {
      it('[SUCCESS]should visit main page', () => {
        cy.contains('Extract Chords From Song');
      });
      it('[SUCCESS]should visit result page with out result', () => {
        cy.visit('/result');
        cy.contains('NO RESULT TO SHOW!');
      });
      describe.skip('NAVIGATION BAR', () => {
        it('[SUCCESS]click Logo on Navbar', () => {
          cy.get('[data-cy="nav-logo"]').click();
          cy.wait(800);
          cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(0, 100);
          });
        });
        it('[SUCCESS]click Extract on Navbar', () => {
          cy.get('[data-cy="nav-result"]').click();
          cy.contains('NO RESULT TO SHOW!');
        });
        it('[SUCCESS]click How to use on Navbar', () => {
          cy.get('[data-cy="nav-tutorial"]').click();
          cy.wait(800);
          cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(1100, 100);
          });
        });
        it('[SUCCESS]click Contact us on Navbar', () => {
          cy.get('[data-cy="nav-contact"]').click();
          cy.wait(800);
          cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(2500, 100);
          });
        });
      });
      describe.skip('FOOTER BAR', () => {
        beforeEach(() => {
          cy.scrollTo(0, 2500);
        });
        it('[SUCCESS]click Home on Footer', () => {
          cy.get('[data-cy="footer-home"]').click();
          cy.wait(800);
          cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(0, 100);
          });
        });
        it('[SUCCESS]click Extract on Footer', () => {
          cy.get('[data-cy="footer-result"]').click();
          cy.contains('NO RESULT TO SHOW!');
        });
        it('[SUCCESS]click How to use on Footer', () => {
          cy.get('[data-cy="footer-tutorial"]').click();
          cy.wait(800);
          cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(1100, 100);
          });
        });
        it('[SUCCESS]click Contact us on Footer', () => {
          cy.get('[data-cy="footer-contact"]').click();
          cy.wait(800);
          cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(2500, 100);
          });
        });
      });
    });

    describe.skip('CONTACT TEST', () => {
      it.skip('[SUCCESS]send contact', () => {
        cy.get('[data-cy="contact-name"]').type('test user');
        cy.get('[data-cy="contact-email"]').type('test@email.com');
        cy.get('[data-cy="contact-message"]').type('test message');
        cy.get('[data-cy="contact-submit"]').click();
        cy.contains('Success');
      });
      it('[ERROR]send contact with wrong email', () => {
        cy.get('[data-cy="contact-name"]').type('test user');
        cy.get('[data-cy="contact-email"]').type('test');
        cy.get('[data-cy="contact-message"]').type('test message');
        cy.get('[data-cy="contact-submit"]').click();
        cy.contains('Success').should('not.exist').wait(2000);
      });
      it('[ERROR]send contact with no complete infomation', () => {
        cy.get('[data-cy="contact-name"]').type('test user');
        cy.get('[data-cy="contact-email"]').type('test@email.com');
        cy.get('[data-cy="contact-submit"]').click();
        cy.contains('Please fill the information');
      });
    });
  });

  describe('E2E TESTS', () => {
    describe('[GET] TEST CONNECTION', () => {
      it('should return the correct response.', () => {
        cy.request({
          method: 'GET',
          url: api_url,
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.test_connection).to.eq('Hello, World!');
        });
      });
    });
    describe('[POST] TEST EXTRACT CHORDS ENDPOINT', () => {
      it('should show the result chords.', () => {
        cy.get('[data-cy="input-file"]').attachFile({
          filePath: './notification.mp3',
          mimeType: 'audio/mpeg',
        });
        cy.contains('notification.mp3');
        cy.get('[data-cy="input-end"]').type('0.5');
        cy.contains('Am').should('not.exist');
      });
    });
    describe('[POST] TEST INVALID FILE TYPE', () => {
      it('should show the file type error.', () => {
        cy.get('[data-cy="input-file"]').attachFile({
          filePath: './notification.txt',
        });
        cy.contains('File type must be audio/*,.wav,.mp3,.mp4');
      });
    });
  });
});
