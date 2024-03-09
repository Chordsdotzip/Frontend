import 'cypress-file-upload';

const api_url =
  'https://0007-2405-9800-b660-6b84-19f7-f32c-cf62-c38e.ngrok-free.app';
describe('TESTS', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('UI TESTS', () => {
    describe('VISIT PAGE TEST', () => {
      describe('[SUCCESS]should visit main page', () => {
        it('should show "Extract Chords From Song"', () => {
          cy.contains('Extract Chords From Song');
        });
      });
      describe('[SUCCESS]should visit result page with out result', () => {
        it('should show the "NO RESULT TO SHOW!".', () => {
          cy.visit('/result');
          cy.contains('NO RESULT TO SHOW!');
        });
      });
      describe('NAVIGATION BAR', () => {
        describe('[SUCCESS]click Logo on Navbar', () => {
          it('should show the Homepage.', () => {
            cy.get('[data-cy="nav-logo"]').click();
            cy.wait(800);
            cy.window().then(($window) => {
              expect($window.scrollY).to.be.closeTo(0, 100);
            });
          });
        });
        describe('[SUCCESS]click Extract on Navbar', () => {
          it('should show the "NO RESULT TO SHOW!".', () => {
            cy.get('[data-cy="nav-result"]').click();
            cy.contains('NO RESULT TO SHOW!');
          });
        });
        describe('[SUCCESS]click How to use on Navbar', () => {
          it('should show the how to use container.', () => {
            cy.get('[data-cy="nav-tutorial"]').click();
            cy.wait(800);
            cy.window().then(($window) => {
              expect($window.scrollY).to.be.closeTo(1100, 100);
            });
          });
        });
        describe('[SUCCESS]click Contact us on Navbar', () => {
          it('should show the contact us container.', () => {
            cy.get('[data-cy="nav-contact"]').click();
            cy.wait(800);
            cy.window().then(($window) => {
              expect($window.scrollY).to.be.closeTo(2500, 100);
            });
          });
        });
      });
      describe('FOOTER BAR', () => {
        beforeEach(() => {
          cy.scrollTo(0, 2500);
        });
        describe('[SUCCESS]click Home on Footer', () => {
          it('should show the Homepage.', () => {
            cy.get('[data-cy="footer-home"]').click();
            cy.wait(800);
            cy.window().then(($window) => {
              expect($window.scrollY).to.be.closeTo(0, 100);
            });
          });
        });
        describe('[SUCCESS]click Extract on Footer', () => {
          it('should show the "NO RESULT TO SHOW!".', () => {
            cy.get('[data-cy="footer-result"]').click();
            cy.contains('NO RESULT TO SHOW!');
          });
        });
        describe('[SUCCESS]click How to use on Footer', () => {
          it('should show the how to use container.', () => {
            cy.get('[data-cy="footer-tutorial"]').click();
            cy.wait(800);
            cy.window().then(($window) => {
              expect($window.scrollY).to.be.closeTo(1100, 100);
            });
          });
        });
        describe('[SUCCESS]click Contact us on Footer', () => {
          it('should show the contact us container.', () => {
            cy.get('[data-cy="footer-contact"]').click();
            cy.wait(800);
            cy.window().then(($window) => {
              expect($window.scrollY).to.be.closeTo(2500, 100);
            });
          });
        });
      });
    });

    describe('CONTACT TEST', () => {
      describe('[SUCCESS]send contact', () => {
        it('should show the success badge.', () => {
          cy.get('[data-cy="contact-name"]').type('test user');
          cy.get('[data-cy="contact-email"]').type('test@email.com');
          cy.get('[data-cy="contact-message"]').type('test message');
          cy.get('[data-cy="contact-submit"]').click();
          cy.contains('Success');
        });
      });
      describe('[ERROR]send contact with wrong email', () => {
        it('should show the wrong email error.', () => {
          cy.get('[data-cy="contact-name"]').type('test user');
          cy.get('[data-cy="contact-email"]').type('test');
          cy.get('[data-cy="contact-message"]').type('test message');
          cy.get('[data-cy="contact-submit"]').click();
          cy.contains('Success').should('not.exist').wait(2000);
        });
      });
      describe('[ERROR]send contact with no complete infomation', () => {
        it('should show the no complete infomation error.', () => {
          cy.get('[data-cy="contact-name"]').type('test user');
          cy.get('[data-cy="contact-email"]').type('test@email.com');
          cy.get('[data-cy="contact-submit"]').click();
          cy.contains('Please fill the information');
        });
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
          filePath: './test.mp3',
          mimeType: 'audio/mpeg',
        });
        cy.contains('test.mp3');
        cy.get('[data-cy="input-end"]').type('0.5');
        cy.contains('Am').should('not.exist');
      });
    });
    describe('[POST] TEST INVALID FILE TYPE', () => {
      it('should show the file type error.', () => {
        cy.get('[data-cy="input-file"]').attachFile({
          filePath: './test.txt',
        });
        cy.contains('File type must be audio/*,.wav,.mp3,.mp4');
      });
    });
    describe('[POST] TEST MAXIMUM FILE SIZE 20 MB', () => {
      it('should show the maximum file size error.', () => {
        cy.readFile('./cypress/fixtures/21MB.mp3', null, {
          timeout: 6000,
        }).as('file');
        cy.get('[data-cy="input-file"]').selectFile('@file', { force: true });
        cy.contains('File is larger than 20000000 bytes');
      });
    });
  });
});
