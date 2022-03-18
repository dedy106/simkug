window.app_saku2_transaksi_kopeg_ppbs_fPostTB = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fPostTB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_ppbs_fPostTB";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Data Neraca Lajur: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;portalui_uploader");		
		this.c_tahun = new saiCB(this,{bound:[20,22,180,20],caption:"Tahun Anggaran",readOnly:true,tag:2,change:[this,"doChange"]});					
		this.c_periode = new saiCB(this,{bound:[20,21,180,20],caption:"Periode Berjalan",readOnly:true,tag:2,change:[this,"doChange"]});					
		this.e_debet = new portalui_saiLabelEdit(this,{bound:[720,21,202,20],caption:"Total Debet",readOnly:true,tipeText:ttNilai,tag:1,text:"0"});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_kredit = new portalui_saiLabelEdit(this,{bound:[720,11,202,20],caption:"Total Kredit",readOnly:true,tipeText:ttNilai,tag:1,text:"0"});
		this.bTampil = new button(this,{bound:[600,11,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		
		this.p1 = new portalui_panel(this,{bound:[20,20,900,450],caption:"Data Neraca Lajur"});
		this.sg = new saiGrid(this.p1,{bound:[0,5,this.p1.width-5,this.p1.height-35],colCount:4,tag:9,
				colTitle:["Kode Akun","DC","Nama","Saldo Akhir"],
				colWidth:[[3,2,1,0],[100 ,350,80,100]],
				colFormat:[[3],[cfNilai]],
				readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg,pager:[this,"doPager"]});
			
		this.rearrangeChild(10, 23);
	
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}			
			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fPostTB.extend(window.childForm);
window.app_saku2_transaksi_kopeg_ppbs_fPostTB.implement({	
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POGL"+this.c_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					var tahunSeb = parseFloat(this.c_tahun.getText()) - 1;
					var tgl = this.c_periode.getText().substr(0,4)+"-"+this.c_periode.getText().substr(5,2)+"-01";	
						
					sql.add("delete from agg_post_m where modul = 'GL' and tahun = '"+tahunSeb+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_gldt where modul = 'GL' and periode like '"+tahunSeb+"%' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into agg_post_m(no_post, kode_lokasi, modul, tgl_input, nik_user, tahun) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','GL',getdate(),'"+this.app._userLog+"','"+tahunSeb+"')");
										
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cf) values "+
								"('"+this.e_nb.getText()+"',"+i+",'"+this.app._lokasi+"','GL','-','-','"+tgl+"','"+line.kode_akun+"','"+line.dc.toUpperCase()+"',"+line.nilai+",'SALDO GL','-','"+this.c_periode.getText()+"','-','IDR',1,"+line.nilai+",getdate(),'"+this.app._userLog+"','-')");
					}					
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
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
					if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
						system.alert(this,"Post data tidak valid.","Neraca Lajur tidak balance.");
						return false;
					}
					else this.simpan();
				break;							
		}	
	},		
	doLoad:function(sender){		
		if (this.c_periode.getText() != "") {						
			var totD=totC=0;
			this.nik_user=this.app._nikUser;
			var sql = "call sp_glma_tmp ('"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.c_periode.getText()+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);			
				
			sql = "select a.kode_akun,case when round(a.so_akhir,0)>0 then 'D' else 'C' end as dc, round(a.so_akhir,0) as so_akhir,b.nama,abs(round(a.so_akhir,0)) as nilai "+
				  "from glma_tmp a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
				  "where a.kode_lokasi ='"+this.app._lokasi+"' and a.nik_user = '"+this.nik_user+"' and round(a.so_akhir,0) <> 0 order by a.kode_akun";
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);		
			
			var line; var totD = totC = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.so_akhir > 0) totD += parseFloat(line.so_akhir);
				if (line.so_akhir < 0) totC += Math.abs(parseFloat(line.so_akhir));
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}
	},	
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_akun,line.dc.toUpperCase(),line.nama,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POGL"+this.c_tahun.getText()+".",'000'));
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
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