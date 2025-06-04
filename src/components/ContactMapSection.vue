<script setup>
import ContactForm from './ContactForm.vue'
</script>

<template>
  <div class="contact-container">
    <div class="contact-form">
      <h2>How to reach us</h2>
      <p class="subtitle">Lorem ipsum dolor sit amet, consetetur.</p>

      <div class="form-and-map">
        <div class="form">
          <ContactForm />
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48588.133010545425!2d-3.7152472!3d40.4363503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f35d4f0c269%3A0x754405946e8ca584!2sAmadeus%20IT%20Group!5e0!3m2!1sen!2slk!4v1749023697096!5m2!1sen!2slk"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    <div class="contact-details">
      <div class="content">
        <div class="address">
          <span class="line-one">Amadeus IT Group</span>
          <span class="line-two">C. Salvador de Madariaga, 1</span>
          <span class="line-three">28027 Madrid</span>
          <span class="line-four">Spain</span>
        </div>
        <div class="social-media">
          <p class="follow-us">Follow us on</p>
          <div class="icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25.443"
                height="20.664"
                viewBox="0 0 25.443 20.664"
                class="icon-facebook"
              >
                >
                <path
                  id="Icon_awesome-twitter"
                  data-name="Icon awesome-twitter"
                  d="M22.827,8.531c.016.226.016.452.016.678A14.735,14.735,0,0,1,8.007,24.045,14.736,14.736,0,0,1,0,21.7a10.787,10.787,0,0,0,1.259.065,10.443,10.443,0,0,0,6.474-2.228,5.224,5.224,0,0,1-4.875-3.616,6.576,6.576,0,0,0,.985.081,5.515,5.515,0,0,0,1.372-.178A5.215,5.215,0,0,1,1.033,10.71v-.065a5.252,5.252,0,0,0,2.357.662A5.222,5.222,0,0,1,1.776,4.333,14.822,14.822,0,0,0,12.528,9.79,5.886,5.886,0,0,1,12.4,8.6a5.219,5.219,0,0,1,9.024-3.568,10.266,10.266,0,0,0,3.309-1.259A5.2,5.2,0,0,1,22.44,6.642a10.454,10.454,0,0,0,3-.807,11.209,11.209,0,0,1-2.615,2.7Z"
                  transform="translate(0 -3.381)"
                  fill="#fff"
                />
              </svg>
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer" class="icon-yt">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27.139"
                height="19.082"
                viewBox="0 0 27.139 19.082"
                class="icon-yt"
              >
                <path
                  id="Icon_awesome-youtube"
                  data-name="Icon awesome-youtube"
                  d="M27.622,7.486a3.41,3.41,0,0,0-2.4-2.415c-2.116-.571-10.6-.571-10.6-.571s-8.487,0-10.6.571a3.41,3.41,0,0,0-2.4,2.415A35.772,35.772,0,0,0,1.05,14.06a35.772,35.772,0,0,0,.567,6.575,3.359,3.359,0,0,0,2.4,2.376c2.116.571,10.6.571,10.6.571s8.487,0,10.6-.571a3.359,3.359,0,0,0,2.4-2.376,35.772,35.772,0,0,0,.567-6.575,35.772,35.772,0,0,0-.567-6.575ZM11.844,18.1v-8.07l7.093,4.035L11.844,18.1Z"
                  transform="translate(-1.05 -4.5)"
                  fill="#fff"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.contact-container {
  background-color: $primary-color-background;
  width: 100%;
  padding-top: $section-top-padding;

  .contact-form {
    width: 100%;
    max-width: $max-content-width;
    margin: 0 auto;
    padding: 0 $horizontal-padding $section-bottom-padding $horizontal-padding;

    h2 {
      color: $main-title-color;
      font-family: $main-title-font;
      font-size: $main-title-font-size;
      font-weight: $main-title-font-weight;
      padding-bottom: 1rem;
    }

    .subtitle {
      color: $subtitle-color;
      font-family: $subtitle-font;
      font-size: $subtitle-font-size;
      font-weight: $subtitle-font-weight;
      margin-bottom: 1rem;
    }

    .form-and-map {
      display: flex;
      flex-direction: row;
      gap: 4rem;
      margin-top: 2rem;

      .form {
        width: 100%;
      }

      iframe {
        width: 100%;
        height: 600px;
      }
    }

    @media (max-width: 900px) {
      padding: 0;

      h2,
      p {
        padding: 0 calc($horizontal-padding / 2) 0 calc($horizontal-padding / 2);
      }

      .form-and-map {
        flex-direction: column;
        gap: 2rem;

        .form {
          padding: 0 calc($horizontal-padding / 2) 0 calc($horizontal-padding / 2);
        }

        iframe {
          height: 500px;
          margin-top: 2rem;
        }
      }
    }
  }

  .contact-details {
    width: 100%;
    background-color: $secondary-color-background;
    // padding: 2rem 0;

    .content {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: $max-content-width;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin: 0 auto;
      padding: 2rem $horizontal-padding;

      .address {
        color: $font-white;
        font-size: 1rem;
        line-height: 1.5;
        margin-right: 2rem;

        .line-one,
        .line-two,
        .line-three,
        .line-four {
          display: block;
          font-family: $subtitle-font;
        }

        .line-one {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
      }

      .social-media {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 2.5rem;
        color: $font-white;
        font-family: $subtitle-font;

        .icons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          color: $font-white;

          a {
            display: inline-block;
            width: 25px;
            height: 25px;
            transition: transform 0.3s ease;

            svg {
              width: 100%;
              height: 100%;
              transition: filter 0.3s ease;
            }

            &:hover {
              transform: scale(1.1);
              filter: brightness(1.2);
            }
          }

          .icon-facebook:hover path {
            fill: #3b5998;
          }

          .icon-yt:hover path {
            fill: #ff0000;
          }
        }
      }

      @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;

        .address {
          text-align: center;
          margin-right: 0;
          margin-bottom: 1rem;
        }

        .social-media {
          justify-content: center;
          width: 100%;
          gap: 1rem;
          margin-top: 1rem;

          .icons {
            justify-content: center;
            gap: 0.5rem;
          }
        }
      }

      @media (max-width: 720px) {
        background-color: $primary-color-background;
      }
    }
  }
}
</style>
