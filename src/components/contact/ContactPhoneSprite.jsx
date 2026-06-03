import { publicUrl } from '../../lib/publicUrl'

export function ContactPhoneSprite() {
  return (
    <img
      src={publicUrl('/images/sprite_phone.png')}
      alt=""
      width={320}
      height={320}
      className="contact-phone-sprite h-56 w-auto sm:h-72 lg:h-[26rem]"
      decoding="async"
      aria-hidden
    />
  )
}
