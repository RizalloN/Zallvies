import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
<<<<<<< HEAD
import { authOptions } from "@/pages/api/auth/[...nextauth]";
=======
import { authOptions } from "@/pages/api/auth/[...nextauth]/route";
>>>>>>> 5cbd41ec33b61fb5b613d3cdb7e25fb6b774ab2f

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req,res,authOptions);

  if (!session?.user?.email) {
    throw new Error("Not Signed In");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
