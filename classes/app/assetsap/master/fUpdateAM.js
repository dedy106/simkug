/**
 * @author dweexfuad
 */
window.app_assetsap_master_fUpdateAM = function(owner) {
	if (owner){
		window.app_assetsap_master_fUpdateAM.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_master_fUpdateAM";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Update Data Location (untuk Prosedur Alternatif)", 0);	
		uses("datePicker;checkBox;app_assetsap_transaksi_fSvrUpload");						
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,220,20],caption:"No Update",readOnly:true});
		this.bGen = new button(this,{bound:[250,2,60,20],caption:"Generate",click:"doClick"});											
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Area Bisnis",			
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel:this.app._namaLokfa,			
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]		
		});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Disetujui Oleh",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});
		this.ed_klpfa = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "Kelompok Aset",
			multiSelection: false,
			change:[this, "doChange"]
			//sql:["select kode_klpfa, nama from amu_klp where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_klpfa","nama"],false, ["Kode Group","Nama"],"and","Data Kelompok Aset(Asset Class)",true]
		});		
		this.bTampil = new button(this, {bound:[820,4,80,20], caption:"Tampil", click:[this,"doTampil"]});
		this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 13,
			colTitle: ["Id Gabung","No Asset", "SN", "Class", "Deskripsi Asset", "Cap Date", "Harga Perolehan", "Akm. Penyusutan", "Nilai Buku", "Deskripsi Lainnya", "Plant","Location","Desc"],
			colWidth: [[12,11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [150, 80, 80, 150, 100, 100, 150, 80, 150, 80, 50, 150,150]],
			colReadOnly: [true,[1,2,3,4,5,6,7,8,9,10],[]],
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9,
			buttonStyle:[[0,11],[bsEllips, bsEllips]],
			ellipsClick: [this,"doEllipsClick"],
			colFormat:[[6,7,8,10],[cfNilai, cfNilai, cfNilai]]
		});		
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:0, grid:this.sg, pager:[this,"doPager"]});
		
		this.rearrangeChild(10,23);			
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");		
		this.doChange(this.ed_lokfa);		
	}
};
window.app_assetsap_master_fUpdateAM.extend(window.childForm);
window.app_assetsap_master_fUpdateAM.implement({
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
					}
				break;
				case "simpan" :
					this.doClick();					
					if (this.standarLib.checkEmptyByTag(this,[0,1,2,9])){
						sql.add("insert into amu_updasset_m (no_update, keterangan, tanggal, kode_lokfa, kode_klpfa, nik_setuju, periode, tgl_input, nik_user)"+
							" values('"+this.ed_kode.getText()+"', '-','"+this.dp_tgl.getDateString()+"','"+this.ed_lokfa.getText()+"','"+this.ed_klpfa.getText()+"','"+this.ed_nik1.getText()+"', '"+this.app._periode+"',now(), '"+this.app._userlog+"' )");
						var data = ["' '"];
						for (var i = 0; i < this.sg1.getRowCount(); i++){
							data[data.length] = "'"+this.sg1.cells(0,i)+"'";
						}
						sql.add("insert into amu_updasset_h select '"+this.ed_kode.getText()+"', no_gabung, ref2, ref1, periode from amu_asset where no_gabung in ("+data+") and kode_lokfa = '"+this.app._lokasi+"' and periode = '"+this.app._periode+"' ");						
						for (var i = 0; i < this.sg1.getRowCount(); i++){
							sql.add("insert into amu_updasset_d (no_update, no_gabung, location, plnt, periode)values('"+this.ed_kode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(11,i)+"', '"+this.sg1.cells(10,i)+"', '"+this.app._periode+"') ");
							sql.add("update amu_asset set location='"+this.sg1.cells(11,i)+"'  where no_gabung = '"+this.sg1.cells(0,i)+"' ");				
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
				
	},
	doChange: function(sender){
		try{
			if (sender == this.ed_lokfa){
				this.sg.clear(1);
				this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
				this.ed_klpfa.setSQL("select a.kode_klpfa, a.nama from amu_klp a "+
					"	inner join amu_lokasi c on c.kode_lokfa = '"+this.ed_lokfa.getText()+"' " +					
					"	inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF' and periode = '"+this.app._periode+"' ) b on b.kode_klpfa = a.kode_klpfa  " +
					" where a.kode_lokasi = '"+this.app._lokasi+"'  ", ["a.kode_klpfa","a.nama"],false, ["Class","Descript"],"and","Data Asset Class",true);
				
			}			
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_updasset_m','no_update',"REVISI-"+this.app._periode+".",'00'));
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
		}else if (sender == this.fileUtil){	        
        }
	},	
	doGridChange: function(sender, col, row,param1,result, data){	
		if (col == 1) {
			var data = this.dbLib.getDataProvider("select no_fa, no_sn, kode_klpfa, nama, nilai, nilai_ap, nilai_buku, date_format(tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, nama2, ref1, ref2, ifnull(b.descript, '-') as namalocation from amu_asset a left outer join xlocation b on b.location = a.ref2 and b.plnt = a.ref1 where no_gabung = '" + sender.cells(0,row) + "' and kode_lokasi = '" + this.app._lokasi + "' ", true);
			if (typeof data != "string"){
				if (data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.sg.editData(row,[line.no_sn, line.kode_klpfa, line.nama, line.tgl_perolehan, parseNilai(line.nilai), parseNilai(line.nilai_ap), parseNilai(line.nilai_buku), line.nama2, line.ref1, line.ref2, line.namalocation],
					[2,3,4,5,6,7,8,9,10,11,12]);
				}
			}			
		}	
    },
	doEllipsClick:function(sender, col ,row){		
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Asset SAP",this.sg, this.sg.row, this.sg.col, 
								"select a.no_gabung, a.no_fa, a.no_sn, a.nama, ref2 from amu_asset a "+								
								" where a.periode = '"+this.app._periode+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ",
								"select count(*) from amu_asset a "+								
								" where a.periode = '"+this.app._periode+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ",
								["a.no_gabung","a.nama"],"and",["ID gabung","No Kartu Asset","No SN","Deskripsi Asset"],false);
					break;				
				case 11 : 
					this.standarLib.showListDataForSG(this, "Daftar Location",this.sg, this.sg.row, this.sg.col, 
								"select location, descript from xlocation ",
								"select count(*) from xlocation ",
								["location","descript"],"and",["Location","Nama"],false);
					break;				
			}	
	},
	doTampil: function(sender){
		var data = this.dbLib.getDataProvider("select no_gabung, no_fa, no_sn, kode_klpfa, nama, nilai, nilai_ap, nilai_buku, date_format(tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, nama2, ref1, ref2, ifnull(b.descript,'-') as namalocation from amu_asset a "+
			"	left outer join xlocation b on b.location = a.ref2 and b.plnt = a.ref1 "+
			"where a.periode = '"+this.app._periode+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ",true);
		var line;
		this.dataFA = data;
		this.rowPerPage = 20;
		this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / this.rowPerPage));
		this.sgn.rearrange();
		this.doSelectedPage(page);
	},
	doSelectedPage: function(page){
		var start = (page - 1) * this.rowPerPage;
		var finish = (start + this.rowPerPage > this.dataFA.rs.rows.length ? this.dataFA.rs.rows.length : start+this.rowPerPage);
		this.sg1.clear();
		for (var i=start; i < finish; i++){
			line = data.rs.rows[i];
			this.sg.appendData([line.no_sn, line.kode_klpfa, line.nama, line.tgl_perolehan, parseNilai(line.nilai), parseNilai(line.nilai_ap), parseNilai(line.nilai_buku), line.nama2, line.ref1, line.ref2, line.namalocation]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page){
		this.page = page;
		this.doSelectedPage(page);
	}
	
});
