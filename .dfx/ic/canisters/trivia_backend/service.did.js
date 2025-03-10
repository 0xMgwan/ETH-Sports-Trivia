export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getEthAddress' : IDL.Func([], [IDL.Opt(IDL.Text)], []),
    'verifySiweAndRegister' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
