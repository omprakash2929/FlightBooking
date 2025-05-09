import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CustomerReviews() {
  const reviewers = [
    {
      id: 1,
      avatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg",
      initials: "JS",
    },
    {
      id: 2,
      avatar: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
      initials: "MR",
    },
    {
      id: 3,
      avatar: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
      initials: "AK",
    },
    {
      id: 4,
      avatar: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
      initials: "TP",
    },
    {
      id: 5,
      avatar: "https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_1280.jpg",
      initials: "RD",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-orange-500 text-6xl font-serif mb-6">"</div>
        <p className="text-xl italic">
          "The tours in this website are great. I had much lovely time with my family! The team is very professional and
          taking care of the customers. Will surely recommend to my friend to join."
        </p>
        <div className="mt-6">
          <p className="font-semibold">John Travolta</p>
          <p className="text-sm text-muted-foreground">Frequent Traveler</p>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {reviewers.map((reviewer) => (
          <Avatar key={reviewer.id} className="h-10 w-10 border-2 border-white">
            <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt="Reviewer" />
            <AvatarFallback>{reviewer.initials}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  )
}
