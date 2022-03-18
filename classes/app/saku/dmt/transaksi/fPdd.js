window.app_saku_dmt_transaksi_fPdd = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fPdd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fPdd";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Adjusment PDD: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_kb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Jurnal", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[270,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Dokumen", maxLength: 50});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,25,480,20],caption:"Keterangan", maxLength: 150});		
		this.bTampil = new portalui_button(this,{bound:[545,25,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[730,25,200,20],caption:"Total Nilai",tipeText:ttNilai,readOnly:true, text: "0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,910,350],caption:"Data Billing"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,910,325],colCount:9,colTitle:["No Bill","Tanggal","Keterangan","No Kontrak","Jml PDD","Jml Rkls","Akun Pdd","Akun Pdpt","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[100,80,200,120,60,60,70,70,100]], colFormat:[[4,5,8],[cfNilai,cfNilai,cfNilai]],defaultRow:1, nilaiChange:[this, "doSgChange"],
					readOnly: true ,autoAppend:false});						
					
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
		    
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();						
			this.jurnal = new app_saku_fJurnalViewer(this.app,{bound:[0,0,system.screenWidth,system.screenHeight],visible:false});									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fPdd.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fPdd.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into dmt_pdd_m(no_pdd,no_dokumen,tanggal, periode, keterangan,kode_lokasi,nilai,nik_user,tgl_input,posted)values" +
						"	('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"' "+
						"	 ,'"+this.app._lokasi+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"',now(),'F' )");					
					
					this.createJurnal();
					var d = "insert into dmt_pdd_j(no_pdd,kode_lokasi,no_urut,kode_akun,dc,nilai,keterangan,kode_pp, kode_drk,periode,tanggal,kode_curr,kurs) values ";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+this.e_kb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+line.dc+"',"+line.nilai+",'"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1)";
					}
					sql.add(d);
					
					if (this.sg.getRowValidCount() > 0){
						var d="insert into dmt_pdd_d(no_pdd, kode_lokasi, no_bill, nilai, periode,akun_pdd,akun_pdpt)values";
						var ix = 0;						
						var listBill = "";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (ix > 0) {d+= ","; listBill += ",";}
							d += "('"+this.e_kb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(8,i))+",'"+this.e_periode.getText()+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"')";
							listBill += "'"+this.sg.cells(0,i)+"'";
							ix++;
						}	
						sql.add(d);
						
						var pNext = nextNPeriode(this.e_periode.getText(),1);
						sql.add(" update dmt_billing set per_flag='"+pNext+"', jml_pdd=jml_pdd+1 "+
							    " where kode_lokasi = '"+this.app._lokasi+"' and per_flag ='"+this.e_periode.getText()+"' and no_bill in ("+listBill+")");
					}
						
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_kb);
					this.sg.clear(1);
				}
				break;			
			case "simpan" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(1,i))) {
							system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl billing. Baris["+i+"]");
							return false;   
						}
					}
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
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
				
		}
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg.clear(1);
				if (this.e_periode.getText() != "") {
					var data = this.dbLib.getDataProvider("select a.no_bill,date_format(a.tanggal,'%d/%m/%Y')as tanggal,a.keterangan,f.no_kontrak,a.jumlah,jml_pdd,a.akun_pdd,f.akun_pdpt,(a.nilai/a.jumlah) as nilai from "+						
						"   dmt_billing a inner join dmt_kontrak f on a.no_kontrak=f.no_kontrak and a.kode_lokasi=f.kode_lokasi "+
						"   where a.kode_lokasi = '"+this.app._lokasi+"' and a.jumlah<>a.jml_pdd and a.per_flag <= '"+this.e_periode.getText()+"' order by a.no_bill");
						
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							if (line !== undefined)
								this.sg.appendData([line.no_bill, line.tanggal, line.keterangan, line.no_kontrak, floatToNilai(line.jumlah), floatToNilai(line.jml_pdd),line.akun_pdd,line.akun_pdpt, floatToNilai(line.nilai)]);
						}
						this.sg.validasi();
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No KB : "+ this.e_kb.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	sgFindBtnClick: function(sender, col, row){		
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.b_gen !== undefined) this.b_gen.click();
	},
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(8,i) != "")
				tot += nilaiToFloat(this.sg.cells(8,i)) ;
		}
		this.e_nilai.setText(floatToNilai(tot));
	},
	createJurnal: function(){				
		try{
			var rows = [];
			for (var i=0;i < this.sg.getRowCount();i++){
				if (nilaiToFloat(this.sg.cells(8,i)) != 0){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(6,i)){
							rows[j].nilai += nilaiToFloat(this.sg.cells(8,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(6,i),nama:'-',dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.sg.cells(8,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
					}
					
					var temu = false;
					for (var k in rows){
						if (rows[k].kode_akun == this.sg.cells(7,i)){
							rows[k].nilai += nilaiToFloat(this.sg.cells(8,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(7,i),nama:'-',dc:"C", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.sg.cells(8,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
					}
				}
			}
			
			this.dataJurnal = {rs: { 	rows:rows,
										fields : { 	kode_akun : {type:"S",length:80},
													nama :{type:"S",length:200},
													dc:{type:"S",length:50},
													keterangan:{type:"S",length:200},
													nilai:{type:"N", length:100},
													kode_pp:{type:"S",length:100},
													kode_drk:{type:"S",length:100}
											}
								   }
							};		
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doClick:function(sender){
		if (sender == this.b_gen) {
			this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_pdd_m","no_pdd",this.app._lokasi+"-PDD"+this.e_periode.getText().substr(2,4)+".","00000"));		
			this.e_dok.setFocus();
		}
		if (sender == this.i_viewer){
			this.createJurnal();			
			this.jurnal.setData(this.dataJurnal);
			this.jurnal.show();
		}
	}	
});