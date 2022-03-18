window.app_rra_transaksi_fRRRSukaRev = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fRRRSukaRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fRRRSukaRev";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PDRK Redistribusi, Realokasi, Reschedule Anggaran: Review SUKKA (UBIS)", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl;saiMemo");
		this.e_periode = new saiLabelEdit(this,{bound:[20,10,222,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new datePicker(this,{bound:[120,11,120,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_sukka = new saiLabelEdit(this,{bound:[20,12,222,20],caption:"No Review",maxLength:30,readOnly:true});
		this.i_gen = new imageButton(this,{bound:[245,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_nb = new saiCBBL(this,{bound:[20,13,222,20],caption:"No SUKKA",maxLength:30,readOnly:true,
			multiSelection:false, change:[this,"doChange"],
			sql:["select a.no_sukka, a.deskripsi, a.no_pdrk from rra_sukka a inner join rra_rev_m b on b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi  "+
				 " where b.progress = '6' and b.kode_ubis = '"+this.app._kodeUbis+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",
				["no_sukka","deskripsi","no_pdrk"],false,["No SUKKA","Keterangan","No PDRK"],"and","Daftar Draft SUKKA",true]
		});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Perihal", maxLength:150});		
		this.cb_pdrk = new saiCBBL(this,{bound:[20,13,222,20],caption:"No PDRK", multiSelection:false, tag:1, change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this,{bound:[20,15,222,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:1});		
		this.e_donor = new saiLabelEdit(this,{bound:[720,15,220,20],caption:"Nilai Donor", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_jenis = new saiCB(this,{bound:[20,14,222,20],caption:"Jenis Anggaran",items:["OPEX","CAPEX"], readOnly:true, tag:1});
		this.e_terima = new saiLabelEdit(this,{bound:[720,14,220,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Data SUKKA","Data Donor","Data Penerima","Nota SUKKA"]});
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,15,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:9,
		            colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Gar","Terpakai","Saldo","Nilai Donor"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[90,90,90,90,90,70,60,60,90,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[10]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai]],
					picklist:[[0],[new arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Terima","Target"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,130,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[7,8]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[7],[cfNilai]],
					picklist:[[0],[new arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
				
		this.mDesk = new tinymceCtrl(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-2,this.pc1.height-15], withForm:false});
		this.mDesk2 = new tinymceCtrl(this.pc1.childPage[3],{bound:[1,60,this.pc1.width-2,this.pc1.height-125], withForm:false});
		//this.mDesk.display();
		//this.mDesk.enable();		
		//this.bView = new button(this.pc1.childPage[0], {bound:[this.pc1.width - 100, 10, 80, 20], caption:"View HTML", click:"doCodeClick", visible:false});
		//this.bLoad = new button(this.pc1.childPage[0], {bound:[this.pc1.width - 200, 10, 80, 20], caption:"Load Template", click:"doCodeClick"});
		this.cb_templ = new saiCBBL(this.pc1.childPage[0],{bound:[this.pc1.width - 200,17,200,20],caption:"Template", visible:false, multiSelection:false, maxLength:10, tag:100, change:[this,"doChange"]});		
		this.m_kpd = new saiMemo(this.pc1.childPage[3],{bound:[10,0,this.pc1.width - 100, 50], caption:"Kepada",readOnly:true});		
		
		this.rearrangeChild(10, 22);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.bAddr = new button(this.pc1.childPage[3],{bound:[this.pc1.width - 85,this.m_kpd.top + 15,80, 20], caption:"Addressbook", click:"doAddressClick"});
		this.cb_nik = new saiCBBL(this.pc1.childPage[3],{bound:[20,15,202,20],caption:"NIK Approve", visible:false,multiSelection:false, maxLength:10, tag:1,
			sql:["select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis='"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true]
		});
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			
			this.cb_pdrk.setSQL("select a.no_pdrk,a.keterangan from rra_pdrk_m a  "+					
					" inner join rra_rev_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
					" inner join rra_sukka c on c.no_pdrk=a.no_pdrk and a.kode_lokasi=c.kode_lokasi "+
					" where b.progress='6' and b.kode_lokasi='"+this.app._lokasi+"' and b.kode_ubis = '"+this.app._kodeUbis+"' "+
					"	and ifnull(case when b.nik_review5 <> '-' then b.nik_review5 else  "+
					"				case when b.nik_review4 <> '-' then b.nik_review4 else "+
					"				case when b.nik_review3 <> '-' then b.nik_review3 else  "+
					"				case when b.nik_review2 <> '-' then b.nik_review5 else c.nik_review end end end end,b.nik_buat) = '"+this.app._userLog+"'",["no_pdrk","keterangan"],false,["No PDRK","Keterangan"],"and","Data PDRK",true);
			this.cb_app.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"' ",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fRRRSukaRev.extend(window.childForm);
window.app_rra_transaksi_fRRRSukaRev.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{								
					var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"rra_nosukka","no_surat","R/KU250/"+this.app._kodeBA+"/"+this.e_periode.getText().substr(0,4)+"","0000","",true);
					//nb = nb.substr(0,4) +"R"+nb.substr(4);	
					this.e_sukka.setText(nb);					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();								
					sql.add("update rra_rev_m set progress = '4' where no_pdrk ='"+this.cb_pdrk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");										
					sql.add("update rra_frev_m set progress = '4' where no_frev like 'FREV%' and no_pdrk ='"+this.cb_pdrk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");					
					sql.add("update rra_pdrk_m set progress='S2' where no_pdrk = '"+this.cb_pdrk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("insert into rra_nosukka(no_sukka, kode_lokasi, no_app, no_surat, kode_ba, status, nik_user, tgl_input) values  "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_sukka.getText()+"','"+this.e_sukka.getText()+"','"+this.app._kodeBA+"','0','"+this.app._userLog+"',now())");
					sql.add("update rra_sukka set nik_app='"+this.cb_app.getText()+"', kepada='"+this.m_kpd.getText()+"' where no_sukka = '"+this.no_sukka+"' ");
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_sukka",field:"keterangan", filter:" no_sukka = '"+this.no_sukka+"' ",value:urlencode(this.mDesk.getCode())}})); 	
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_sukka",field:"justifikasi", filter:" no_sukka = '"+this.no_sukka+"' ",value:urlencode(this.mDesk2.getCode())}})); 	
					//sql.add("insert into rra_sukka(no_sukka,periode,kode_lokasi,no_pdrk,tanggal,keterangan,nik_buat,nik_app,modul) values "+
					//	    "('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_pdrk.getText()+"','"+this.dp_d1.getDateString()+"','"+urlencode(this.mDesk.getCode())+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','SUKKA')");
					//					
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
	doModalResult: function(event, modalResult, requester){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				/*
				if (nilaiToFloat(this.e_donor.getText()) != nilaiToFloat(this.e_terima.getText()) )  {
					system.alert(this,"Transaksi tidak valid.","Nilai Donor dan Terima harus sama.");
					return false;						
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(10,i)) > nilaiToFloat(this.sg.cells(9,i))) {
							var k = i+1;
							system.alert(this,"Transaksi Donor tidak valid.","Nilai Donor melebihi Saldo Anggaran [Baris: "+k+"]");
							return false;						
						}
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && this.sg.cells(1,j) == this.sg.cells(1,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi Donor tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
								return false;
							}
						}
					}
				}
				for (var j=i;j < this.sg2.getRowCount();j++){
					if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
						var k = i+1;
						system.alert(this,"Transaksi Terima tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
						return false;
					}
				}*/								
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;		
			case "loadData":
				this.m_kpd.setText("");				
				for (var i in requester.dataSelection){
					var line = requester.dataSelection[i];
					if (line.value1 != "")
						this.m_kpd.addText(line.value1+"/"+this.app._dataKaryawan.get(line.value1).nama+"/"+this.app._dataKaryawan.get(line.value1).jabatan+"\n");
				}
			break;		
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
	},
	doClick:function(sender){
		var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"rra_nosukka","no_surat","R/KU250/"+this.app._kodeBA+"/"+this.e_periode.getText().substr(0,4)+"","0000","",true);
		//nb = nb.substr(0,4) +"R"+nb.substr(4);
		this.e_sukka.setText(nb);
		this.e_ket.setFocus();
	},
	doChange:function(sender){		
		try{
			if (sender == this.e_nb){						
				var data = this.dbLib.getDataProvider("select a.no_pdrk, a.no_sukka, date_format(a.tanggal, '%d-%m-%Y') as tgl, a.keterangan, a.deskripsi, a.nik_app, justifikasi, a.kepada  "+
					" from rra_sukka a where no_sukka = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);				
				if (typeof data != "String" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.dp_d1.setText(line.tgl);
					this.e_ket.setText(line.deskripsi);				
					this.cb_pdrk.setText(line.no_pdrk);				
					this.cb_app.setText(line.nik_app);
					this.m_kpd.setText(line.kepada.replace(/<br>/gi,"\r\n"));
					this.no_sukka = line.no_sukka;
					this.mDesk.setCode(urldecode(line.keterangan));					
					this.mDesk2.setCode(urldecode(line.justifikasi));
				}
			}
			if (sender == this.cb_templ){
				var data = this.dbLib.getDataProvider("select keterangan from rra_draft where kode_draft = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
				if (typeof data != "string" && data.rs.rows[0] != undefined){				
					this.mDesk.setCode(urldecode(data.rs.rows[0].keterangan));
				}
			}	
			if (sender == this.cb_pdrk && this.cb_pdrk.getText()!="") {
				this.sg.clear(); this.sg2.clear();
				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target "+
							 "from rra_rev_d a inner join rra_rev_m bb on a.no_rev=bb.no_rev and a.kode_lokasi=bb.kode_lokasi "+
							 "                 inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							 "				   inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "				   left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where bb.no_pdrk = '"+this.cb_pdrk.getText()+"' and bb.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (line.dc.toUpperCase() == "C")
							this.sg.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai_gar),floatToNilai(line.nilai_pakai),floatToNilai(line.saldo),floatToNilai(line.nilai)]);
						else this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai),line.target]);
					}
				} else {
					this.sg.clear(1);
					this.sg2.clear(1);
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(10,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(10,i));			
				}
			}
			this.e_donor.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(7,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(7,i));			
				}
			}
			this.e_terima.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCodeClick : function(sender)
	{
		try{		
			if (sender == this.bView){
				this.mDesk.toggleMode();			
				if (this.mDesk.viewMode == 2){
					sender.setHint("Preview");
				}else sender.setHint("Source Code (HTML)");
			}
			if (sender == this.bLoad){
				this.standarLib.showListData(this, "Daftar Draft Justifikasi",this.cb_templ,undefined, 
											  "select kode_draft, nama  from rra_draft where kode_lokasi ='"+this.app._lokasi+"' and upper(jenis) = upper('SUKKA')",
											  "select count(kode_draft) from rra_draft where kode_lokasi ='"+this.app._lokasi+"' and upper(jenis) = upper('SUKKA')",
											  ["kode_draft","nama"],"and", ["Kode Draft","Nama"],false);
			}
		}catch(e){
			alert(e);
		}
	},
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							system.info(this,"transaksi telah sukses tersimpan"," (Kode : "+ this.e_nb.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.alert(this,result,"");
						setTipeButton(tbSimpan);
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				system.alert(this,e,"");
			}
	    }
	},
	doAddressClick : function(sender){
		try{						
			this.standarLib.showSelection(this, "Daftar Karyawan di RRA",sender,
											"select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' ",											  
											["nik","nama","jabatan"], ["NIK","Nama","Jabatan"],false);
		}catch(e){
			sysetemAPI.alert(e);
		}
	}
});
