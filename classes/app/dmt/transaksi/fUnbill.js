window.app_dmt_transaksi_fUnbill = function(owner)
{
	if (owner)
	{
		window.app_dmt_transaksi_fUnbill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_dmt_transaksi_fUnbill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Unbill: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_nilai = new saiLabelEdit(this,{bound:[550,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[780,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
	
		this.p1 = new panel(this,{bound:[20,23,840,333],caption:"Data Jurnal"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:9,
		            colTitle:["Akun Unbill","Nama Akun","Akun Pdpt","Nama Akun","Kode PP","Nama PP","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,150,80,150,80,150,80]],
					colFormat:[[6],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_dmt_transaksi_fUnbill.extend(window.childForm);
window.app_dmt_transaksi_fUnbill.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_akru_m","no_akru",this.app._lokasi+"-AKR"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into dmt_akru_m(no_akru,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'-','-','F','AR','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");					
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into dmt_akru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_unbill+"','"+this.e_ket.getText()+"','D',"+line.nilai+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','AR','UNBILL','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						sql.add("insert into dmt_akru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','C',"+line.nilai+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','AR','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}
					sql.add("update dmt_bill_d set no_akru='"+this.e_nb.getText()+"' where periode ='"+this.e_periode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and no_akru ='-' and no_ar='-'");
					
					/* amortisasi
					sql.add("update a set a.no_akru='"+this.e_nb.getText()+"',a.akun_unbill=b.akun_pdd "+
							"from dmt_bill_d a inner join dmt_kontrak_m b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							"where a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.no_akru ='-' and a.no_ar<>'-'");
					*/
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_akru_m","no_akru",this.app._lokasi+"-AKR"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
		this.e_nilai.setText("0");
		var strSQL = "select a.akun_unbill,x.nama as nama_unbill,a.akun_pdpt,y.nama as nama_pdpt,'"+this.app._kodePP+"' as kode_pp,c.nama as nama_pp, "+
					 "sum(a.rawat+a.fee+a.sewa) as nilai "+
					 "from dmt_bill_d a  "+					 
					 "inner join pp c on '"+this.app._kodePP+"'=c.kode_pp and c.kode_lokasi='"+this.app._lokasi+"' "+
					 "inner join masakun x on a.akun_unbill=x.kode_akun and a.kode_lokasi=x.kode_lokasi "+
					 "inner join masakun y on a.akun_pdpt=y.kode_akun and a.kode_lokasi=y.kode_lokasi "+					
					 "where a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.no_akru ='-' and a.no_ar='-' "+
					 "group by a.akun_unbill,a.akun_pdpt,x.nama,y.nama,c.nama ";
					 
					 /* amortisasi
					 "union "+
					 "select aa.akun_pdd,x.nama as nama_pdd,a.akun_pdpt,y.nama as nama_pdpt,'"+this.app._kodePP+"' as kode_pp,c.nama as nama_pp, "+
					 "sum(a.nilai_ar) as nilai "+
					 "from dmt_bill_d a inner join dmt_kontrak_m aa on a.no_kontrak=aa.no_kontrak and a.kode_lokasi=aa.kode_lokasi  "+					 
					 "inner join pp c on '"+this.app._kodePP+"'=c.kode_pp and c.kode_lokasi='"+this.app._lokasi+"' "+
					 "inner join masakun x on aa.akun_pdd=x.kode_akun and aa.kode_lokasi=x.kode_lokasi "+
					 "inner join masakun y on a.akun_pdpt=y.kode_akun and a.kode_lokasi=y.kode_lokasi "+					
					 "where a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.no_akru ='-' and a.no_ar<>'-' "+
					 "group by aa.akun_pdd,a.akun_pdpt,x.nama,y.nama,c.nama";
					 */
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai);
			}		
			this.e_nilai.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
	},
	doChange:function(sender){
		if (sender == this.e_periode) {			
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.akun_unbill,line.nama_unbill,line.akun_pdpt,line.nama_pdpt,line.kode_pp,line.nama_pp,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});