import {
  Anchor,
  AppLayout,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  SwitchRouterButton,
  SwitchThemeButton,
  useToastController,
  XStack,
  YStack
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-user' : '/user'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

  return (
    <AppLayout title="BreakLog">
      <YStack flex={1} justify="center" items="center" gap="$8" p="$4">      
        <XStack
          position="absolute"
          width="100%"
          t="$6"
          gap="$6"
          justify="center"
          flexWrap="wrap"
          $sm={{ position: 'relative', t: 0 }}
        >
          {Platform.OS === 'web' && (
            <>
              <SwitchRouterButton pagesMode={pagesMode} />
              <SwitchThemeButton />
            </>
          )}
        </XStack>

        <YStack gap="$4" alignItems="center">
          <H1 text="center" color="$color12">
            Welcome to BreakLog.
          </H1>
          <Paragraph color="$color10" text="center" maxWidth={400}>
            Track your breaks, improve your productivity, and maintain a healthy work-life balance.
          </Paragraph>
          <Separator />
          <Paragraph text="center" color="$color11">
            This app uses the same code on Next.js and React Native.
          </Paragraph>
          <Separator />
        </YStack>

        <YStack gap="$4" alignItems="center">
          <Button {...linkProps} size="$5" theme="blue">
            View Profile
          </Button>
          
          <Button size="$4" variant="outlined">
            Start Break Timer
          </Button>
        </YStack>

        <SheetDemo />
      </YStack>
    </AppLayout>
  )
}

function SheetDemo() {
  const toast = useToastController()

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          bg="$shadow4"
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle bg="$color8" />
        <Sheet.Frame items="center" justify="center" gap="$10" bg="$color2">
          <XStack gap="$2">
            <Paragraph text="center">Made by</Paragraph>
            <Anchor color="$blue10" href="https://twitter.com/natebirdman" target="_blank">
              @natebirdman,
            </Anchor>
            <Anchor
              color="$blue10"
              href="https://github.com/tamagui/tamagui"
              target="_blank"
              rel="noreferrer"
            >
              give it a ⭐️
            </Anchor>
          </XStack>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
