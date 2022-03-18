/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fMdmRekon = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fMdmRekon.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fMdmRekon";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Rekonsiliasi Modem Data dan Imux", 0);	
		try{
			uses("datePicker;saiCBBL;saiGrid;pageControl;checkBox");			
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});						
			this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Rekon",readOnly:true});
			this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});														
			this.ed_vendor = new saiCBBL(this, {bound:[20,3,200,20], caption:"Vendor", multiSelection :false, 
				sql:["select kode_vendor, nama from amu_vendor ", ["kode_vendor","nama"],false, ["Vendor","Nama"],"and","Data Vendor",true],
				change:[this,"doChange"]		
			});
			this.ed_kontrak = new saiCBBL(this, {
				bound: [20, 30, 200, 20],
				caption: "No Kontrak",
				multiSelection: false,							
				change:[this,"doChange"]		
			});
			
			this.ed_lokfa = new saiCBBL(this, {
				bound: [20, 4, 200, 20],
				caption: "Bus.Area",
				multiSelection: false,
				change:[this,"doChange"],
				multiSelection : false,
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"'",["kode_lokfa","nama"],false, ["BA","Nama"],"and","Daftar BA",true]			
			});
			this.ed_ket = new saiLabelEdit(this, {bound:[20,5,500,20], caption:"Keterangan"});
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 200, 20],
				caption: "Pembuat",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.app._kodeLokfa+"'", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});	
			this.p1 = new pageControl(this,{bound:[20,11,900,230],childPage:["Detail Kontrak","NKA"]});
			this.sg = new saiGrid(this.p1.childPage[0], {
				bound: [1, 0, 898, 180],
				colCount: 9,
				colTitle: "Jenis Barang, Jenis Aset, SN, Nilai, NMS, MM, SA, STATUS MM & SA, STATUS MM, NMS & SA",
				colWidth: [[8, 7, 6, 5, 4, 3, 2, 1, 0], [120,120, 80, 100, 100, 100, 50, 150,150]],
				colReadOnly: [true,[0,1,2,3,4,5,6],[]],
				change: [this, "doGridChange"],
				rowCount: 1,
				tag: 9,				
				autoPaging : true, rowPerPage:20, pasteEnable:true, afterPaste:[this,"doAfterPaste"],
				buttonStyle:[[7,8],[bsAuto, bsAuto ]],
				ellipsClick: [this,"doEllipsClick"],
				colFormat:[[3],[cfNilai]],
				picklist:[[7,8],[new arrayMap({items:["OK","NOT OK"]}),new arrayMap({items:["OK","NOT OK"]})]]
			});		
			this.sgn = new sgNavigator(this.p1.childPage[0],{bound:[1,this.p1.height - 45,898,25],buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
			this.sgnka = new saiGrid(this.p1.childPage[1],{bound:[0,0,598,270], colCount: 5, 
				colTitle:["No Gabung","NKA","Sub No.","Deskripsi","Alamat"], 
				readOnly:true,				
				colWidth:[[4,3,2,1,0],[200,250,60,100,100]]				
			});
			this.sgn1 = new sgNavigator(this.p1.childPage[1],{bound:[0,this.p1.height - 25, 598, 25], borderStyle:3, buttonStyle:bsTransNav, grid:this.sgnka, pager:[this,"doPager"]});
			
			this.p2 = new panel(this,{bound:[20,12,440,200],caption:"Disiapkan Oleh"});
			this.sg2 = new saiGrid(this.p2,{bound:[1,20,438,145], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, ellipsClick:[this,"doEllipsClick"]});
			this.sgn2 = new sgNavigator(this.p2,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg2, pager:[this,"doPager"]});
			this.p3 = new panel(this,{bound:[480,12,440,200],caption:"Direview Oleh"});
			this.sg3 = new saiGrid(this.p3,{bound:[1,20,438,145], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, ellipsClick:[this,"doEllipsClick"]});
			this.sgn3 = new sgNavigator(this.p3,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg3, pager:[this,"doPager"]});
			
			this.rearrangeChild(10,23);			
			this.setTabChildIndex();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
						
			this.onClose.set(this,"doClose");												
			this.rowPerPage = 20;
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fMdmRekon.extend(window.childForm);
window.app_assetsap_transaksi_fMdmRekon.implement({
	doClose: function(sender){				
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sg.clear(1);					
						this.dataKonversi = undefined;	
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();											
						sql.add("insert into amu_mdmrekon (no_rekon, kode_lokasi, keterangan, kode_vendor, no_kontrak, tanggal, nik_buat, periode, kode_lokfa)values"+
							"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','"+this.ed_ket.getText()+"','"+this.ed_vendor.getText()+"','"+this.ed_kontrak.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_nik1.getText()+"','"+this.app._periode+"','"+this.ed_lokfa.getText()+"')");							
						for (var i=0; i < this.sg.getRowCount(); i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into amu_mdmrekon_d(no_rekon, nu,status1,status2, kode_lokasi) "+
								" values('"+this.ed_kode.getText()+"','"+i+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"','"+this.app._lokasi+"')");
							}
						}		
						for (var i=0; i < this.sg2.getRowCount(); i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into amu_alt_ttd(no_bukti, status, nik, no_urut, progress)values('"+this.ed_kode.getText()+"','0','"+this.sg2.cells(0,i)+"','"+i+"',0)");
							}
						}
						for (var i=0; i < this.sg3.getRowCount(); i++){
							if (this.sg3.rowValid(i)){
								sql.add("insert into amu_alt_ttd(no_bukti, status, nik, no_urut, progress)values('"+this.ed_kode.getText()+"','1','"+this.sg3.cells(0,i)+"','"+i+"',0)");
							}
						}
						this.dbLib.execArraySQL(sql);													
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){		
		if (sender == this.sg2 || sender == this.sg3){
				this.standarLib.showListDataForSG(this, "Daftar Karyawan",sender, sender.row, sender.col, 
													  "select nik, nama from amu_karyawan ",
													  "select count(*) from amu_karyawan ",
													  ["nik","nama"],"where",["NIK","Nama"],false);
			}		
	},
	doChange: function(sender){
		if (sender == this.ed_vendor){			
			this.ed_kontrak.setSQL("select no_kontrak, keterangan from amu_kontrak where kode_lokasi = '"+this.app._lokasi+"' and kode_vendor = '"+sender.getText()+"' ", ["no_kontrak","keterangan"],false, ["Klp Aset","Nama"],"and","Data Kelompok Aset",true);			
		}
		if (sender == this.ed_kontrak){
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
				"select a.no_gabung, a.no_fa, a.no_sn, a.nama, a.nama2 from amu_asset a inner join amu_kontrak_nka b on b.no_gabung = a.no_gabung and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"'and a.periode = '"+this.app._periode+"' and b.no_kontrak = '"+sender.getText()+"'",
				"select a.nu, a.jenis_brg, a.jenis_aset, a.sn, a.nilai, a.nms, a.mm, a.sa from amu_kontrak_d a where a.no_kontrak = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by nu"
			]}), true);
			if (typeof data == "string"){
				systemAPI.alert(data);
				return;
			}
			var table1 = data.result[0];
			var table2 = data.result[1];
			this.sgnka.clear();
			this.sg.clear();						
			for (var i in table1.rs.rows){				
				var line = table1.rs.rows[i];
				this.sgnka.appendData([line.no_gabung, line.no_fa, line.no_sn, line.nama, line.nama2]);
			}			
			for (var i in table2.rs.rows){				
				var line = table2.rs.rows[i];
				this.sg.appendData([line.jenis_brg, line.jenis_aset, line.sn, floatToNilai(line.nilai), line.nms, line.mm, line.sa, '-','-']);
			}
			this.sgn.setTotalPage(Math.ceil(table2.rs.rows.length/20));
			this.sgn.rearrange();
		}		
		if (sender == this.ed_lokfa){
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);			
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_mdmrekon','no_rekon',"RKN/"+this.dp_tgl.getYear()+"/",'0000'));
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();
                                                      
						}else system.info(this,result,"");
	    			break;	    			
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}		       
		}
	},	
	doGridChange: function(sender, col, row,param1,result, data){	    		
    },    
	doEllipsClick:function(sender, col ,row){						
	},
	doEditChange: function(sender){
		try{			
		}catch(e){
			alert(e);
		}
	},					
	doAfterPaste: function (sender, rowCount, page){
		this.sgn.setTotalPage(sender.getTotalPage());
		this.sgn.rearrange();		
	}
});
