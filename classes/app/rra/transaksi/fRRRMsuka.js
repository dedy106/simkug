window.app_rra_transaksi_fRRRMsuka = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fRRRMsuka.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fRRRMsuka";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PRDRK RRA Anggaran: SUKKA MA", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No SUKKA",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Perihal", maxLength:150});		
		this.cb_reviewer = new saiCBBL(this,{bound:[20,11,200,20],caption:"Reviewer", multiSelection:false, maxLength:10, bufferOption: boHALF, bufferData: this.app._listNIK, tag:1});
		this.cb_app = new saiCBBL(this,{bound:[20,15,202,20],caption:"NIK Approve", multiSelection:false, maxLength:10, bufferOption: boHALF, bufferData: this.app._listNIK, tag:1});
		this.cb_pdrk = new saiCBBL(this,{bound:[20,13,202,20],caption:"No PDRK", multiSelection:false, tag:1, change:[this,"doChange"]});
		this.e_donor = new saiLabelEdit(this,{bound:[720,13,200,20],caption:"Nilai Donor", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_jenis = new saiCB(this,{bound:[20,14,202,20],caption:"Jenis Anggaran",items:["OPEX","CAPEX"], readOnly:true, tag:1});
		this.e_terima = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Data SUKKA","Data Donor","Data Penerima","Nota SUKKA"]});
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,15,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:9,
		            colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Gar","Terpakai","Saldo","Nilai Donor"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[90,90,90,90,90,70,60,60,90,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[10]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Terima","Target"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,130,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[7,8]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[7],[cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.mDesk = new tinymceCtrl(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-2,this.pc1.height- 10], withForm:false});
		
		//this.bView = new button(this.pc1.childPage[0], {bound:[this.pc1.width - 200, 10, 80, 20], caption:"View HTML", click:"doCodeClick", visible:false});
		this.bLoad = new button(this.pc1.childPage[0], {bound:[this.pc1.width - 100, 10, 80, 20], caption:"Load Template", click:"doCodeClick"});
		this.cb_templ = new saiCBBL(this.pc1.childPage[0],{bound:[this.pc1.width - 200,17,200,20],caption:"Template", visible:false, multiSelection:false, maxLength:10, tag:100, change:[this,"doChange"]});
		this.m_kpd = new saiMemo(this.pc1.childPage[3],{bound:[10,0,this.pc1.width - 100, 50], caption:"Kepada",readOnly:true});		
		this.mDesk2 = new tinymceCtrl(this.pc1.childPage[3],{bound:[1,60,this.pc1.width-2,this.pc1.height-125], withForm:false});
		
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
			this.dbLib = this.app._dbLib;
			this.dbLib.addListener(this);
			
			this.standarLib = new util_standar();		
			
			this.cb_pdrk.setSQL("select a.no_pdrk,a.keterangan from rra_pdrk_m a inner join rra_mrev_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi where b.progress='3' and b.kode_lokasi='"+this.app._lokasi+"'",["no_pdrk","keterangan"],false,["No PDRK","Keterangan"],"and","Data PDRK",true);
			this.cb_app.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan ",true);
			this.cb_reviewer.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis='"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.onClose.set(this, "doClose");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fRRRMsuka.extend(window.childForm);
window.app_rra_transaksi_fRRRMsuka.implement({
	doClose: function(sender){
		this.dbLib.delListener(this);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_sukka","no_sukka","FSUKKA-"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();								
					sql.add("update rra_mrev_m set progress = '6' where no_pdrk in (select no_pdrk from  rra_pdrk_m where no_pdrk='"+this.cb_pdrk.getText()+"' and kode_lokasi='"+this.app._lokasi+"') and kode_lokasi = '"+this.app._lokasi+"' ");										
					sql.add("update rra_frev_m set progress = '6' where no_frev like 'FREV%' and no_pdrk in (select no_pdrk from rra_pdrk_m where no_pdrk='"+this.cb_pdrk.getText()+"' and kode_lokasi='"+this.app._lokasi+"') and kode_lokasi = '"+this.app._lokasi+"' ");					
					sql.add("update rra_pdrk_m set progress='S1' where no_pdrk = '"+this.cb_pdrk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("insert into rra_sukka(no_sukka,periode,kode_lokasi,no_pdrk,tanggal,keterangan,nik_buat,nik_app,modul,deskripsi, kepada, nik_review) values "+
						    "('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_pdrk.getText()+"','"+this.dp_d1.getDateString()+"',null,'"+this.app._userLog+"','"+this.cb_app.getText()+"','MSUKKA','"+this.e_ket.getText()+"','"+this.m_kpd.getText()+"','"+this.cb_reviewer.getText()+"')");
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_sukka",field:"keterangan", filter:" no_sukka = '"+this.e_nb.getText()+"' ",value:urlencode(this.mDesk.getCode())}})); 	
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_sukka",field:"justifikasi", filter:" no_sukka = '"+this.e_nb.getText()+"' ",value:urlencode(this.mDesk2.getCode())}})); 	
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql, undefined, this);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doModalResult: function(event, modalResult){
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
				}	*/							
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_sukka","no_sukka","FSUKKA-"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},
	doChange:function(sender){
		if (sender == this.cb_templ){
			var data = this.dbLib.getDataProvider("select keterangan from rra_draft where kode_draft = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
			if (typeof data != "string" && data.rs.rows[0] != undefined){				
				this.mDesk.setCode(urldecode(data.rs.rows[0].keterangan));
			}
		}	
		if (sender == this.cb_pdrk && this.cb_pdrk.getText()!="") {
			this.sg.clear(); this.sg2.clear();
			//rra_mrev_d
			var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target, bb.nik_buat, bb.nik_app3 "+
			             "from rra_mrev_d a inner join rra_mrev_m bb on a.no_mrev=bb.no_mrev and a.kode_lokasi=bb.kode_lokasi "+
						 "                  inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
						 "				    inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "				    left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
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
				this.cb_reviewer.setText(line.nik_review);
				this.cb_app.setText(line.nik_app3);
			} else {
				this.sg.clear(1);
				this.sg2.clear(1);
			}
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
	doRequestReady: function(sender, methodName, result, callbackObj){
		if (sender == this.dbLib && this == callbackObj){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							system.info(this,"transaksi telah sukses tersimpan"," (Kode : "+ this.e_nb.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.alert(this,result,"");
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
			error_log(e);
		}
	}
});
