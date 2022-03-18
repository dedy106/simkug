window.app_saku3_transaksi_ppbs_fPaRevenue = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaRevenue.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaRevenue";						   
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Revenue : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_tahun = new saiCB(this,{bound:[20,9,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.c_jenis = new saiCB(this,{bound:[800,9,220,20],caption:"Jenis",items:["REGULER","INTERNASIONAL","EKSTENSI","PJJ"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Prodi",tag:2,multiSelection:false,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this,{bound:[800,18,220,20],caption:"Total Data", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,390], childPage:["Daftar Transaksi","Data Revenue"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Prodi","Nama","Tahun","Total Data","Jenis"],
					colWidth:[[5,4,3,2,1,0],[100,100,50,400,60,100]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],		
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				
		this.bPeriode = new button(this.pc1.childPage[1],{bound:[20,16,80,18],caption:"Load Data Angkatan",click:[this,"doPeriode"]});
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-70],colCount:10,tag:9,
		            colTitle:["Angkt","Nama Angkt", "BPP Paket Genap Mala","BPP NonPaket Genap Mala","Rata-Rata SKS Non Paket","BPP Paket Ganjil Mala","BPP NonPaket Ganjil Mala","Rata-Rata SKS Ganjil Mala","Maba Jalur Non USM","Maba Jalur USM"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,150,150,150,150,150,150,150 ,100,60]],										
					columnReadOnly:[true,[1],[0,2,3,4,5,6,7,8,9]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2,3,4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],checkItem:true,
					checkItem:true,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});			
		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.pp=this.dbLib.getPeriodeFromSQL("select kode_pp as periode from agg_user where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' ");
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			this.pc1.childPage[1].rearrangeChild(10, 23);
			this.c_tahun.setText("");
			var sql = new server_util_arrayList();			
			sql.add("select kode_angkat,nama from agg_angkat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaRevenue.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaRevenue.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.nb = this.app._lokasi+'-RV'+this.c_jenis.getText().substr(0,1)+this.c_tahun.getText()+this.cb_pp.getText();					
										
					sql.add("delete from agg_rev_m where no_rev ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					sql.add("delete from agg_rev_d where no_rev ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					sql.add("delete from agg_rev_load where no_rev ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					sql.add("delete from agg_d where no_bukti ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' and substring(periode,1,4)='"+this.c_tahun.getText()+"'");
							
					sql.add("insert into agg_rev_m (no_rev,kode_lokasi,tahun,kode_pp,total,jenis) values "+
							"('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.c_jenis.getText()+"')");
										
					
					if (this.sg2.getRowValidCount() > 0){						
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into agg_rev_load(no_rev,kode_lokasi,tahun,kode_angkat,n1,n2,n3,n4,n5,n6,n7,n8) values "+
									    "('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+","+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(8,i))+","+nilaiToFloat(this.sg2.cells(9,i))+")");
							
																
								var jmlTot = nilaiToFloat(this.sg2.cells(8,i)) + nilaiToFloat(this.sg2.cells(9,i));
								
								if (this.c_jenis.getText() == "REGULER") {
									var paramJNUSMB = "SRP1NB"; 	//"JNUSMB";   BRP1NP
									var paramJUSMB = "SRP1UB";  	//"JUSMB";  BRP1UB
									var paramAsrama = "ARP1NB"; 	//"ASRAMA";
									var paramUP3 = "URP1NB";    	//"UP3";
									var paramBPP = "BRP1NB";    	//"BPP";
									var paramBPPPGNL = "BRP2PL";	//"BPPPGNL";
									var paramBPPPGJL = "BRP1PL";	//"BPPPGJL";
									
									var paramBPPNPGNL = "BRN2PL";
									var paramSKSGNNP = "BRS2PL";
									var paramBPPNPGJL = "BRN1PL";
									var paramSKSGJL = "BRS1PL";
								}								
								if (this.c_jenis.getText() == "INTERNASIONAL") {
									var paramJNUSMB = "SIP1NB";     //"JNUSMBI";  BIP1NB
									var paramJUSMB =  "SIP1UB";     //"JUSMBI";  BIP1UB
									var paramAsrama = "AIP1NB";     //"ASRAMAI";
									var paramUP3 = "UIP1MB";        //"UP3I";
									var paramBPP = "BIP1NB";        //"BPPI";
									var paramBPPPGNL = "BIP2PL";    //"BPPPGNLI";
									var paramBPPPGJL = "BIP1PL";    //"BPPPGJLI";
									
									var paramBPPNPGNL = "BIN2PL";
									var paramSKSGNNP = "BIS2PL";
									var paramBPPNPGJL = "BIN1PL";
									var paramSKSGJL = "BIS1PL";
								}
								if (this.c_jenis.getText() == "EKSTENSI") {
									var paramJNUSMB = "SEP1NB";		//"JNUSMBX";
									var paramJUSMB = "SEP1UB";		//"JUSMBX";
									var paramAsrama = "AEP1NB";		//"ASRAMAX";
									var paramUP3 = "UEP1MB";		//"UP3X";
									var paramBPP = "BEP1NB";		//"BPPX";
									var paramBPPPGNL = "BEP2PL";	//"BPPGNLX";
									var paramBPPPGJL = 	"BEP1PL"; 	//"BPPGJLX";
									
									var paramBPPNPGNL = "BEN2PL";
									var paramSKSGNNP = "BES2PL";
									var paramBPPNPGJL = "BEN1PL";
									var paramSKSGJL = "BES1PL";
								}
								if (this.c_jenis.getText() == "PJJ") {
									var paramJNUSMB = "SPP1NB";		//"JNUSMBX";
									var paramJUSMB = "SPP1UB";		//"JUSMBX";
									var paramAsrama = "APP1MB";		//"ASRAMAX";
									var paramUP3 = "UPP1MB";		//"UP3X";
									var paramBPP = "BPP1NB";		//"BPPX";
									var paramBPPPGNL = "BPP2PL";	//"BPPGNLX";
									var paramBPPPGJL = 	"BPP1PL"; 	//"BPPGJLX";
									
									var paramBPPNPGNL = "BPN2PL";
									var paramSKSGNNP = "BPS2PL";
									var paramBPPNPGJL = "BPN1PL";
									var paramSKSGJL = "BPS1PL";
								}
																		
										
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
										"('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramBPPNPGNL+"','-','-',"+nilaiToFloat(this.sg2.cells(3,i))+",0,0)");
								
								//22-10-18
								var sksGenap = nilaiToFloat(this.sg2.cells(3,i)) * nilaiToFloat(this.sg2.cells(4,i));
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
									    "('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramSKSGNNP+"','-','-',"+sksGenap+",0,0)");
								
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
										"('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramBPPNPGJL+"','-','-',"+nilaiToFloat(this.sg2.cells(6,i))+",0,0)");
										
								//22-10-18
								var sksGanjil = nilaiToFloat(this.sg2.cells(6,i)) * nilaiToFloat(this.sg2.cells(7,i));		
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
									    "('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramSKSGJL+"','-','-',"+sksGanjil+",0,0)");
																		
																								
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
									    "('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramJNUSMB+"','-','-',"+nilaiToFloat(this.sg2.cells(8,i))+",0,0)");
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
									    "('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramJUSMB+"','-','-',"+nilaiToFloat(this.sg2.cells(9,i))+",0,0)");
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
										"('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramAsrama+"','-','-',"+jmlTot+",0,0)");
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
										"('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramUP3+"','-','-',"+jmlTot+",0,0)");
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
										"('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramBPP+"','-','-',"+jmlTot+",0,0)");
								
							
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
									    "('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramBPPPGNL+"','-','-',"+nilaiToFloat(this.sg2.cells(2,i))+",0,0)");
								sql.add("insert into agg_rev_d(no_rev,kode_lokasi,tahun,kode_pp,kode_angkat,kode_param,kode_akun,kode_drk,jumlah,tarif,total) values "+
									    "('"+this.nb+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+paramBPPPGJL+"','-','-',"+nilaiToFloat(this.sg2.cells(5,i))+",0,0)");
								
							}
						}
					}
					
					sql.add("update a set a.kode_akun=b.kode_akun,a.kode_drk=b.kode_drk,a.tarif=b.tarif,a.total=a.jumlah*b.tarif "+
							"from agg_rev_d a inner join agg_param_tarif b on "+
							"a.kode_param=b.kode_param and a.kode_pp=b.kode_pp and a.kode_angkat=b.kode_angkat and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
							"where a.no_rev='"+this.nb+"' and a.tahun='"+this.c_tahun.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					//cash
					var j=8;
					sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
							"select a.no_rev,a.kode_lokasi,a.kode_pp,a.kode_drk,a.kode_akun,a.kode_param,b.nama,'MHS','"+this.c_tahun.getText()+(j<10?"0":"")+j+"',round(total,0),1,1,round(total,0),'PDPT' "+
							"from agg_rev_d a inner join agg_param_klp b on a.kode_param=b.kode_param and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
							"where a.total<> 0 and a.no_rev='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param in ('ARP1NB','AIP1NB','AEP1NB','APP1MB',  'URP1NB','UIP1MB','UEP1MB','UPP1MB', 'SRP1NB','SRP1UB',  'SIP1NB','SIP1UB',  'SEP1NB','SEP1UB',  'SPP1NB','SPP1UB'  )"); // ('ASRAMAI','UP3I','ASRAMAX','UP3X','ASRAMA','UP3','JNUSMB','JUSMB')");
										
							
					//acrual
					for (var j=2; j <= 7; j++){
						sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
								"select a.no_rev,a.kode_lokasi,a.kode_pp,a.kode_drk,a.kode_akun,a.kode_param,b.nama,'MHS','"+this.c_tahun.getText()+(j<10?"0":"")+j+"',round(total/6,0),1,1,round(total/6,0),'PDPT' "+
								"from agg_rev_d a inner join agg_param_klp b on a.kode_param=b.kode_param and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
								"where a.total<> 0 and a.no_rev='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param in ('BRP2PL','BIP2PL','BEP2PL','BPP2PL',  'BRN2PL','BIN2PL','BEN2PL','BPN2PL',  'BPS2PL'   )"); // ('BPPPGNL','BPPNPGNL','SKSGNNP','BPPPGNLI','BPPGNLX')");  22-10-18--> 'BRS2PL','BIS2PL','BES2PL', pindah ke feb (sekaligus tidak di /6)

						//22-10-18--> 'BRS2PL','BIS2PL','BES2PL', pindah ke feb (sekaligus tidak di /6)		
						if (j==2) {
							sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
								"select a.no_rev,a.kode_lokasi,a.kode_pp,a.kode_drk,a.kode_akun,a.kode_param,b.nama,'MHS','"+this.c_tahun.getText()+(j<10?"0":"")+j+"',round(total,0),1,1,round(total,0),'PDPT' "+
								"from agg_rev_d a inner join agg_param_klp b on a.kode_param=b.kode_param and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
								"where a.total<> 0 and a.no_rev='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param in ('BRS2PL','BES2PL','BIS2PL')"); 
						}		
					}
					
					for (var j=8; j <= 12; j++){
						sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
								"select a.no_rev,a.kode_lokasi,a.kode_pp,a.kode_drk,a.kode_akun,a.kode_param,b.nama,'MHS','"+this.c_tahun.getText()+(j<10?"0":"")+j+"',round(total/6,0),1,1,round(total/6,0),'PDPT' "+
								"from agg_rev_d a inner join agg_param_klp b on a.kode_param=b.kode_param and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
								"where a.total<> 0 and a.no_rev='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param  in ('BRP1PL','BIP1PL','BEP1PL','BPP1PL',    'BRN1PL','BIN1PL','BEN1PL','BPN1PL',    'BPS1PL',   'BRP1NB','BIP1NB','BEP1NB','BPP1NB','BEP1NB','BEP1UB','BIP1NB','BIP1UB',  'BRP1NB', 'BRP1UB','BPP1NB','BPP1UB')"); //('BPPPGJL','BPPNPGJL',  'SKSGNNP',     'BPP','BPPI','BPPX','  BPPPGJLI','BPPGJLX')");    22-10-18 'BRS1PL','BIS1PL','BES1PL',  ---->pindah ke agus (sekaligus tidak di /6)
						
						//22-10-18--> 'BRS1PL','BIS1PL','BES1PL', pindah ke agu (sekaligus tidak di /6)
						if (j==8) {
							sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
								"select a.no_rev,a.kode_lokasi,a.kode_pp,a.kode_drk,a.kode_akun,a.kode_param,b.nama,'MHS','"+this.c_tahun.getText()+(j<10?"0":"")+j+"',round(total,0),1,1,round(total,0),'PDPT' "+
								"from agg_rev_d a inner join agg_param_klp b on a.kode_param=b.kode_param and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
								"where a.total<> 0 and a.no_rev='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param  in ('BRS1PL','BES1PL','BIS1PL')"); 
						}
					}		
		
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_pp);					
					this.doLoad();
				}
				break;
			case "simpan" :	
			case "ubah" :	
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){						
						for (var j=i;j < this.sg2.getRowCount();j++){
							if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data angkatan untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from agg_rev_m where no_rev ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
				sql.add("delete from agg_rev_d where no_rev ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
				sql.add("delete from agg_rev_load where no_rev ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
				sql.add("delete from agg_d where no_bukti ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' and substring(periode,1,4)='"+this.c_tahun.getText()+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;				
		}
	},
	doPeriode:function(sender){						
		this.sg2.clear(1)
		var strSQL = "select kode_angkat,nama,0 as n1,0 as n2,0 as n3,0 as n4,0 as n5,0 as n6,0 as n7,0 as n8 from agg_angkat "+
					"where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'";						   
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_angkat,line.nama,floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5),floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8)]);
			}
		} else this.sg2.clear(1);
	},	
	doChange: function(sender){
		try{			
			if (sender == this.c_tahun && this.c_tahun.getText()!="") {
				if (this.app._userStatus=="A")
				{
					this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' and tahun='"+this.c_tahun.getText()+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
				}
				else
				{
					
					this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' and kode_pp='"+this.pp+"' and tahun='"+this.c_tahun.getText()+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi",true);
				}
				//this.cb_pp.setSQL("select kode_pp, nama from agg_pp where flag_aktif='1' and tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi",true);				
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_pp.getText()+")");							
							this.app._mainForm.bClear.click();							
							setTipeButton(tbSimpan);
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAngkat = new portalui_arrayMap();																					
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAngkat.set(line.kode_angkat, line.nama);										
								}								
							}							
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				setTipeButton(tbUbahHapus);
				this.nb = this.sg1.cells(0,row);
				this.c_jenis.setText(this.sg1.cells(5,row));
				this.pc1.setActivePage(this.pc1.childPage[1]);																	
				var strSQL = "select a.kode_angkat,a.nama,b.n1,b.n2,b.n3,b.n4,b.n5,b.n6,b.n7,b.n8 "+
							 "from agg_angkat a inner join agg_rev_load b on a.kode_angkat=b.kode_angkat and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_rev='"+this.sg1.cells(0,row)+"' and b.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_angkat,line.nama,floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5),floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8)]);
					}
				}
				this.sg2.validasi();	
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){				
		if (this.cb_pp.getText() != "" && this.c_tahun.getText() != "") {
			var strSQL = "select a.no_rev,b.kode_pp,b.nama,b.tahun,a.total,a.jenis "+
						 "from agg_rev_m a inner join agg_pp b on a.kode_pp=b.kode_pp and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
						 "where a.tahun='"+this.c_tahun.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp";		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Request tidak valid.","Tahun dan Prodi harus diisi."); 
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_rev,line.kode_pp,line.nama,line.tahun,floatToNilai(line.total),line.jenis]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Angkatan",sender,undefined, 
						    "select kode_angkat,nama from agg_angkat where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",
							"select count(*) from agg_angkat where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",
							["kode_angkat","nama"],"and",["Kode","Nama"],false);				
				}							
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){
		if ((col == 2 || col == 3 || col == 4 || col == 5 || col == 6 || col == 7 || col == 8 || col == 9) && (this.sg2.cells(2,row) != "" && this.sg2.cells(3,row) != ""  && this.sg2.cells(4,row) != "" && this.sg2.cells(5,row) != "" && this.sg2.cells(6,row) != "" && this.sg2.cells(7,row) != "" && this.sg2.cells(8,row) != "" && this.sg2.cells(9,row) != "")) this.sg2.validasi();
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg2.cells(0,row) != "") {				
				var angkat = this.dataAngkat.get(sender.cells(0,row));				
				if (angkat) sender.cells(1,row,angkat);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Angkatan "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell2");		
	},
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i=0;i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(2,i) != "" && this.sg2.cells(3,i) != "" && this.sg2.cells(4,i) != "" && this.sg2.cells(5,i) != "" && this.sg2.cells(6,i) != "" && this.sg2.cells(7,i) != "" && this.sg2.cells(8,i) != "" && this.sg2.cells(9,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(2,i))+nilaiToFloat(this.sg2.cells(3,i))+nilaiToFloat(this.sg2.cells(4,i))+nilaiToFloat(this.sg2.cells(5,i))+nilaiToFloat(this.sg2.cells(6,i))+nilaiToFloat(this.sg2.cells(7,i))+nilaiToFloat(this.sg2.cells(8,i))+nilaiToFloat(this.sg2.cells(9,i));
				}
			}			
			this.e_total.setText(floatToNilai(Math.round(tot * 100)/100));						
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	}
});